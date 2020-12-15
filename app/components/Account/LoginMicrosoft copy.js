import React,{useEffect,useState} from "react";
import { Icon, Button } from "react-native-elements";
import { StyleSheet,  Alert } from "react-native";
import * as firebase from "firebase";
import * as AppAuth from 'expo-app-auth';
//import { AuthManager } from "../../auth/AuthManager";


export default function LoginMicrosoft() {

  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  /*const _signInAsync = async  ()=>{
    

  try {
    await AuthManager.signInAsync();

    navigation.reset({
      index: 0,
      routes: [ { name: 'Main' } ]
    });
  } catch (error) {
    console.log(error);
    Alert.alert(
      'Error signing in',
      JSON.stringify(error),
      [
        {
          text: 'OK'
        }
      ],
      { cancelable: false }
    );
    }
 }
/*
 _signInAsync = async () => {
  
  }
}*/

  return (
    <Button
      title="Iniciar sesión con Microsoft"
      onPress={async () => {
        const _authState = await signInAsync();
        setAuthState(_authState);
      }}
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


let config = {
  issuer: 'https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize',
  scopes: ['openid', 'profile'],
  /* This is the CLIENT_ID generated from a Firebase project */
  clientId: 'c2bda0e4-a212-4169-8aa3-db5544b6308a',
};


let StorageKey = '@MyApp:CustomGoogleOAuthKey';

export async function signInAsync() {
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}