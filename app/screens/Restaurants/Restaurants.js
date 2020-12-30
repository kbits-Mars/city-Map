import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

export default function Restaurantes(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);
  return (
    <View style={styles.viewBody}>
      <Text>Restaurantes...</Text>
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#F97666"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-restaurants")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 }, // width: negativo para que se vaya a la izquierda, height: negativo para que se vaya hacia arriba
    shadowOpacity: 0.5,
  },
});
