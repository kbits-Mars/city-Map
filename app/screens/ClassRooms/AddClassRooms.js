import React, { useState, useRef } from "react";
import { View} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddClassRoomsForm from "../../components/ClassRooms/AddClassRoomsForm";




export default function AddClassRooms(props) {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false)
  const toastRef= useRef();
  console.log(props);
  return (
    <View>
      <AddClassRoomsForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Toast ref={toastRef} position="center" opacity={0.9}/>
      <Loading isVisible={isLoading} text="creando Aula"/>
    </View>
  );
}
