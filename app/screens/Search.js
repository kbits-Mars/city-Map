import React,{useEffect,useState} from "react";
import {StyleSheet, View, Text, FlatList, Image } from "react-native";
import{SearchBar, ListItem, Icon} from "react-native-elements";

export default function Busqueda(props) {
  const{navigation}= props;
  const [search, setSearch] = useState("")
  return (
    <View>
      <SearchBar
      placeholder= "Busca tu Aula"
      onChangeText={(e)=>setSearch(e)}
      containerStyle={styles.searchBar}
      value= {search}
      />
    </View>
  );
}

const styles= StyleSheet.create({
  searchBar:{
    marginBottom: 20,
  }

})