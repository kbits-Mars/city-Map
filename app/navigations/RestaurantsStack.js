import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurantes from "../screens/Restaurants/Restaurants";
import AddRestaurants from "../screens/Restaurants/AddRestaurants";

const Stack = createStackNavigator();

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurantes}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
       name="add-restaurants"
       component={AddRestaurants}
       options={{title: "Añadir nuevo restaurante"}}
      />
    </Stack.Navigator>
  );
}
