// app/(tabs)/SemesterStack.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Grades from "./grades";
import Semesters from "./semester";
import Performance from "./performance";
import CustomTableComponent from "./tables";

const Stack = createStackNavigator();

const SemesterStack= ()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Grades"
        component={Grades}
        options={{ title: "Years" }}
      />

      <Stack.Screen
        name='Semesters'
        component={Semesters}
      />
      
      <Stack.Screen
        name='Performance'
        component={CustomTableComponent}
       />
      
    </Stack.Navigator>
  );
};

export default SemesterStack;
