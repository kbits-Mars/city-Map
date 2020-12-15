import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClassRooms from "../screens/ClassRooms/ClassRooms";
import AddClassRooms from "../screens/ClassRooms/AddClassRooms";

const Stack = createStackNavigator();

export default function ClassRoomsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="class-rooms"
        component={ClassRooms}
        options={{ title: "Aulas" }}
      />
      <Stack.Screen
       name="add-class-rooms"
       component={AddClassRooms}
       options={{title: "Añadir nueva Aula"}}
      />
    </Stack.Navigator>
  );
}
