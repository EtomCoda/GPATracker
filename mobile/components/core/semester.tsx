// components/Semesters.tsx
import React, { useState } from "react";
import { ScrollView, Pressable, StyleSheet, Alert } from "react-native";
import NewButton from "./newbutton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text } from "../Themed";
import { View } from "../Themed";
import { useNavigation } from "@react-navigation/native";

type Props = {
  route: {
    params: {
      year: number;
    };
  };
}

export default function Semesters({ route }: Props) {
  const navigation:any=useNavigation()
  const { year } = route.params;
  const [semesters, setSemesters] = useState<number[]>([1, 2]);

  const addSemester = () => {
    setSemesters((prevSemesters) => [
      ...prevSemesters,
      prevSemesters.length + 1,
    ]);
  };

  const deleteSemester = (semester: number) => {
    if (semester === 1) {
      Alert.alert("Cannot Delete", "You cannot delete Year 1.");
      return;
    }
    // Check if the year to delete is the last remaining year
    if (semesters.length === 1 && semesters[0] === semester) {
      setSemesters([]);
      return;
    }

    // Find the index of the year to delete
    const indexToDelete = semesters.indexOf(semester);

    // Check if there are subsequent semesters that have not been deleted
    if (
      semesters
        .slice(indexToDelete + 1)
        .some((year) => semesters.includes(year))
    ) {
      Alert.alert(
        `You can't delete year ${semester}`,
        "You have to delete the semesters after this year first."
      );
      return;
    }

    // All subsequent semesters are deleted, so delete the selected year
    setSemesters((prevsemesters) =>
      prevsemesters.filter((year) => year !== semester)
    );
  };

  return (
    <ScrollView>
      <Text>Year {year}</Text>
      {semesters.map((semester) => (
        <View key={semester}>
          <Pressable
            onPress={() => console.log(`Semester ${semester} button pressed`)}
          >
            <Text>Semester {semester}</Text>
            <Text>GPA: {semester}</Text>
          </Pressable>
          {semester !== 1 && (
            <Pressable onPress={() => deleteSemester(semester)}>
              <FontAwesome name="trash" size={25} color="red" />
            </Pressable>)}
            <Pressable onPress={()  => navigation.navigate('Performance')}>
            <FontAwesome name="arrow-circle-right" size={25} color="blue" />
          </Pressable>
        </View>
      ))}
      <NewButton title="Add Semester" onPress={addSemester} />
    </ScrollView>
  );
};


