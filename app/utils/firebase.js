import firebase from "firebase/app";
const firebaseConfig={
    apiKey: "AIzaSyDvg3hsITO_cbyjSS0Z_WlmDqGxZJkPYlw",
    authDomain: "ug-map-e6ed9.firebaseapp.com",
    databaseURL: "https://ug-map-e6ed9.firebaseio.com",
    projectId: "ug-map-e6ed9",
    storageBucket: "ug-map-e6ed9.appspot.com",
    messagingSenderId: "479844087681",
    appId: "1:479844087681:web:5355bf83aaaf25b27cda80"
}

export const firebaseApp= firebase.initializeApp(firebaseConfig);