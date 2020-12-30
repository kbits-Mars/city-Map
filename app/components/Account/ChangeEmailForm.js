import React,{useState} from "react";
import {View,StyleSheet} from "react-native";
import { Input,Button } from "react-native-elements";



export default function ChangeEmailForm(props){
    const {email,setShowModal,toastRef}= props;
    const [newEmail, setNewEmail] = useState(null);
    const [error, setError] = useState(null);
    
    const onSubmit= ()=>{

        if(!newEmail){
            setError("El campo esta vacío");

        }else if(newEmail===email){
            setError("El email no puede ser igual al anterior");
        }else{
           console.log("ok");
        }

        
    }

    return(
        <View styles={styles.view}>
          <Input
          placeholder="email"
          rightIcon={{
              name: "at",
              type: "material-community",
              color: "#c2c2c2"
          }
          }
          containerStyle={styles.input}
          defaultValue={email || ""}
          onChange={(e)=> setNewEmail(e.nativeEvent.text)}
          errorMessage={error}
          />

          <Button
          title= "cambiar correo"
          buttonStyle= {styles.btn}
          containerStyle={styles.btnContainer}
          onPress={onSubmit}
          
          />

        </View>
    );
}


const styles= StyleSheet.create({
    view:{
     paddingBottom:10,
     paddingTop:10,
     alignItems: "center"
    },
    input:{
        marginBottom:10,
    },
    btn:{
        backgroundColor: "#F97666"
    },
    btnContainer:{
        marginTop:20,

    }

})