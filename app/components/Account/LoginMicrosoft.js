import React,{useEffect,useState} from "react";
import { Icon, Button } from "react-native-elements";
import { StyleSheet,  Alert } from "react-native";
import * as firebase from "firebase";
import * as AppAuth from 'expo-app-auth';
// import {AzureInstance, AzureLoginView} from 'react-native-azure-ad-2';
//import { AuthManager } from "../../auth/AuthManager";
// import azureAuth from "./azureAuth";
// import {AzureInstance, AzureLoginView} from 'react-native-azure-ad-2';

// const CREDENTIAILS = {
//   client_id: 'c2bda0e4-a212-4169-8aa3-db5544b6308a',
//   client_secret: 'we34c-55a9V62kl2_gttsmj_.6O-UT5O7g',

//   scope: 'User.ReadBasic.All Mail.Read offline_access'

// };

export default function LoginMicrosoft() {
  

  // const login = new azureAuth(CREDENTIAILS);

  const login= ()=>{
    console.log("login");
  }


  return (
    <Button
      title="Iniciar sesión con Microsoft"
      onPress={()=> login()}
      buttonStyle={styles.buttonMicrosoft}
      containerStyle={styles.btnContainerMicrosoft}
      icon={
        <Icon
          type="material-community"
          name="windows"
          iconStyle={styles.Microsoft}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  Microsoft: {
    color: "white",
    marginRight: 10,
  },
  buttonMicrosoft: {
    backgroundColor: "#5CACE9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
  },
  btnContainerMicrosoft: {
    marginTop: -30,
  },
});




