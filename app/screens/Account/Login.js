import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";
import LoginMicrosoft from "../../components/Account/LoginMicrosoft";
//import { AuthManager } from '../../auth/AuthManager';

export default function Login() {

  /*const  componentDidMount= async()=> {
    try {
      const accessToken = await AuthManager.getAccessTokenAsync();
  
      // TEMPORARY
      this.setState({userName: accessToken, userLoading: false});
    } catch (error) {
      alert(error);
    }
  }*/

  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/Login-map.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
      <LoginMicrosoft/>
      </View>
      <Toast ref={toastRef} position="center" opacity={(0, 9)} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta? {"  "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Regístrate
      </Text>
    </Text>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 350,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#063ECA",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#063ECA",
    margin: 40,
  },
});
