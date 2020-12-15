import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter, stubFalse } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modal";

import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);


const widthScreen = Dimensions.get("window").width;

export default function AddClassRoomsForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [classRoomName, setClassRoomName] = useState("");
  const [classRoomSchool, setClassRoomSchool] = useState("");
  const [classRoomDescription, setClassRoomDescription] = useState("");
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationClassRoom, setLocationClassRoom] = useState(null);

  const addClassRoom = () => {
    if (!classRoomName || !classRoomDescription || !classRoomSchool) {
      toastRef.current.show(
        "Todos los campos del formulario son obligatorios",
        2000
      );
    } else if (size(imagesSelected) === 0) {
      toastRef.current.show("El aula debe tener por lo menos una foto", 2000);
    } else if (!locationClassRoom) {
      toastRef.current.show(
        "Tienes seleccionar una ubicación en el mapa para el aula ",
        2000
      );
    } else {
      setIsLoading(true);
      uploadImageStorage().then((response) =>{
        

        db.collection("classRooms")
           .add({
             name: classRoomName,
             school: classRoomSchool,
             description: classRoomDescription,
             location: locationClassRoom,
             images: response,
             rating: 0,
             ratingTotal: 0,
             quantityVoting: 0,
             creatAt: new Date(),
             createBy: firebase.auth().currentUser.uid,

           })
           .then(()=>{
            setIsLoading(false);
            navigation.navigate("class-rooms");
           }).catch(()=>{
             setIsLoading(false);
             toastRef.current.show("Error al subir la aula, intentelo de nuevo");
           })
      });

    }
  };

  const uploadImageStorage= async ()=>{
    //console.log(imagesSelected);
    const imageBlob= [];
    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref= firebase.storage().ref("classRooms").child(uuid());
         await ref.put(blob).then(async (result) =>{
            await firebase
           .storage()
           .ref(`classRooms/${result.metadata.name}`)
           .getDownloadURL()
           .then((photoUrl) =>{
             imageBlob.push(photoUrl);
           })
         })
      })
    );
   

    return imageBlob;
    
  }


  return (
    <ScrollView style={styles.scrollView}>
      <ImageClassRoom imagenClassRoom={imagesSelected[0]} />
      <FormAdd
        setClassRoomName={setClassRoomName}
        setClassRoomSchool={setClassRoomSchool}
        setClassRoomDescription={setClassRoomDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationClassRoom={locationClassRoom}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <Button
        title="Crear Aula"
        onPress={addClassRoom}
        buttonStyle={styles.btnAddClassRoom}
      />

      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationClassRoom={setLocationClassRoom}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageClassRoom(props) {
  const { imagenClassRoom } = props;
  return (
    <View styles={styles.viewPhoto}>
      <Image
        source={
          imagenClassRoom
            ? { uri: imagenClassRoom }
            : require("../../../assets/img/no-image.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

function FormAdd(props) {
  const {
    setClassRoomName,
    setClassRoomSchool,
    setClassRoomDescription,
    setIsVisibleMap,
    locationClassRoom,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Numero del Aula "
        containerStyle={styles.input}
        onChange={(e) => setClassRoomName(e.nativeEvent.text)}
      />

      <Input
        placeholder="Facultad"
        containerStyle={styles.input}
        onChange={(e) => setClassRoomSchool(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: (!locationClassRoom ? "#c2c2c2" : "#00a680"),
          onPress: () => setIsVisibleMap(true),
        }}
      />

      <Input
        placeholder="Descripcion del Aula"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setClassRoomDescription(e.nativeEvent.text)}
      />
    </View>
  );
}
function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationClassRoom,
    toastRef,
  } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );

      const statusPermissions = resultPermissions.permissions.location.status;
      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localización para crear una aula ",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationClassRoom(location);
    toastRef.current.show("Localización guardada correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicación"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="cancelar Ubicación"
            containerStyle={styles.viewMapBtnContaincerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

function UploadImage(props) {
  const { toastRef, imagesSelected, setImagesSelected } = props;
  const imagesSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermissions === "dinied") {
      toastRef.current.show(
        "Es necesario activar los permisos de galeria, si lo has rechazado tienes que ir ha ajustes y activarlos manualmente.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("No has seleccionado ninguna imagen", 2000);
      } else {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    const arrayImages = imagesSelected;
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImagesSelected(
              filter(arrayImages, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImages}>
      {size(imagesSelected) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          inputContainerStyle={styles.containerIcon}
          onPress={imagesSelect}
        />
      )}

      {map(imagesSelected, (imageClassRoom, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imageClassRoom }}
          onPress={() => removeImage(imageClassRoom)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddClassRoom: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContaincerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
  },
});
