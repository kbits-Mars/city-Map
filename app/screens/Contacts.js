import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import {NavigationHelpersContext, useNavigation} from "@react-navigation/native";

export default function Contactos(){
    const navigation = useNavigation();

    return(

    
            <ScrollView centerContent={true} style={styles.viewBody}>
              <Image
                source={require("../../assets/img/map.png")}
                resizeMode="contain"
                style={styles.image}
              />
        
              <Text style={styles.title}>INTEGRANTES</Text>
              <Text style={styles.description}>
              LOJA YAGUAL ROGELIO DAVID
             

              </Text>
              <Text style={styles.description}>
             
              BAJAÑA DIAZ ELENA DE LOS ANGELES
              

              </Text>

              <Text style={styles.description}>
              
              BONILLA LANDIVAR RICARDO JESUS
            
           

              </Text>

              <Text style={styles.description}>
              
              PROAÑO INDACOCHEA KEVIN MARCELO
         

              </Text>

              <Text style={styles.description}>
           
              MORAN CALLE VICTOR ANDRES

              </Text>

             
        
             
              
             
            </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    viewBody: {
      marginLeft: 30,
      marginRight: 30,
    },
  
    image: {
      height: 300,
      width: "100%",
      marginBottom: 40,
    },
    title: {
      fontWeight: "bold",
      fontSize: 19,
      marginBottom: 10,
      textAlign: "center",
    },
    description: {
      textAlign: "center",
      marginBottom: 20,
    },
    viewBtn:{
     flex: 1,
     alignItems:"center",
    },
    btnStyle: {
      backgroundColor: "#00a680",
    },
    btnContainer: {
      width: "70%"
    },
  });
  