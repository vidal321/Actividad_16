import React,  { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, TextInput, Switch } from "react-native";
import db from '../firebase/config';
import {ref, set, push, child} from "firebase/database";

export default function CreateScreen({ route, navigation }) {

   const [areaText, setAreaText] = useState("");
   const [pinText, setPinText] = useState("");
   const [statusText, setStatusText] = useState(false);

   const toggleSwitch = () => setStatusText(!statusText);


  return (
    <SafeAreaView style={styles.listItem}>
      <View style={{alignItems:"left",flex:1, justifyContent: 'space-between'}}>
      
      <Text>Area:</Text>
      <TextInput onChangeText={setAreaText} value={areaText} />
      
      <Text>Pin:</Text>
      <TextInput onChangeText={setPinText} value={pinText} />
      
      <Text>Estatus:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={statusText.status ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={statusText}
      />

      <Button onPress={() =>{
        const newPostKey = push(child(ref(db), 'devices')).key;


          set(ref(db, 'devices/' + newPostKey), {
                          area: areaText,
                          status: statusText,
                          pin : pinText
                        });
           setAreaText('')
          setPinText('')
          setStatusText(false)
          navigation.navigate('Home');
      }} title="Guardar"/>

      <Button onPress={() =>{
         setAreaText('')
        setPinText('')
        setStatusText(false)
        navigation.navigate('Home');
      }} title="Cancelar" />
      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});