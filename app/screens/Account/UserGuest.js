import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import {NavigationHelpersContext, useNavigation} from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();
  
  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/Login-map1.png")}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>Consulta tu perfil de ug map</Text>
      <Text style={styles.description}>
        ¿buscas una aula en espefica en tu facultad? Busca y visualiza la mejor
        ruta para llegar a una aula de una forma sencilla, nostros te guiaremos
        y comenta como ha sido tu experiecia.
      </Text>

      <View style={styles.viewBtn}>
        <Button
          title="Ver tu perfil"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("login")}
        />
      </View>
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
    backgroundColor: "#F97666",
  },
  btnContainer: {
    width: "70%"
  },
});
