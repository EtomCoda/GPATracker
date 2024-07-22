import { Pressable,Alert,ScrollView } from "react-native";
import { View,Text } from "../../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import NewButton from "@/components/core/newbutton";


export default function Grades() {

  const navigation:any = useNavigation();

  const [years, setYears] = useState<number[]>([1, 2, 3]);
  const addYear = () => {
    setYears((prevYears) => [...prevYears, prevYears.length + 1]);
  };

  const deleteYear = (yearToDelete: number) => {
    if (yearToDelete === 1) {
      Alert.alert("Cannot Delete", "You cannot delete Year 1.");
      return;
    }
    // Check if the year to delete is the last remaining year
    if (years.length === 1 && years[0] === yearToDelete) {
      setYears([]);
      return;
    }

    // Find the index of the year to delete
    const indexToDelete = years.indexOf(yearToDelete);

    // Check if there are subsequent years that have not been deleted
    if (years.slice(indexToDelete + 1).some((year) => years.includes(year))) {
      Alert.alert(
        `You can't delete year ${yearToDelete}`,
        "You have to delete the years after this year first."
      );
      return;
    }

    // All subsequent years are deleted, so delete the selected year
    setYears((prevYears) => prevYears.filter((year) => year !== yearToDelete));
  };



  return (
    <ScrollView>
      {years.map((year) => (
        <View key={year}>
          <Pressable onPress={() => console.log(`Year ${year} button pressed`)}>
            <Text>Year {year}</Text>
            <Text>CGPA: {year}</Text>
          </Pressable>
          {year !== 1 && (
            <Pressable onPress={() => deleteYear(year)}>
              <FontAwesome name="trash" size={25} color="red" />
            </Pressable>
          )}
          <Pressable onPress={()  => navigation.navigate('Semesters', { year:year })}>
            <FontAwesome name="arrow-circle-right" size={25} color="blue" />
          </Pressable>
        </View>
      ))}
      <NewButton title="Add Year" onPress={addYear} />
    </ScrollView>
  );
}
