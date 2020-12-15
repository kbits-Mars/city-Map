import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

//import ClassRooms from "../screens/ClassRooms";
//import Favorites from "../screens/Favorites";
//import Search from "../screens/Search";
//import Contacts from "../screens/Contacts";
//import Account from "../screens/Account";

import ClassRoomsStack from "./ClassRoomsStack";
import FavoritesStack from "./FavoritesStack";
import SearchStack from "./SearchStack";
import ContactsStack from "./ContactsStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="class-rooms"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="class-rooms"
          component={ClassRoomsStack}
          options={{ title: "Aulas" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Busqueda" }}
        />

        <Tab.Screen
          name="contacts"
          component={ContactsStack}
          options={{ title: "Contactos" }}
        />

        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "class-rooms":
      iconName = "compass-outline";
      break;
    case "favorites":
      iconName = "star-outline";
      break;

    case "search":
      iconName="map-search";
      break;

    case "contacts":
      iconName="google-classroom"
    break;
    case "account":
      iconName="login";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
