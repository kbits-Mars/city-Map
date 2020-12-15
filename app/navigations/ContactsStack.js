import React from "react";
import {createStackNavigator}  from "@react-navigation/stack";
import Contacts from "../screens/Contacts";

const Stack = createStackNavigator();

export default function ContactsStack(){
    return(
       <Stack.Navigator>
           <Stack.Screen
           name="contacts"
           component={Contacts}
           options={{title:"Contactos"}}
           />
       </Stack.Navigator>
    );
}