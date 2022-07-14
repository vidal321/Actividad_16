import React,  { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, TextInput, Switch } from "react-native";
import db from './../../src/firebase/config';
import {ref, set, remove} from "firebase/database";

export default function DetailScreen({ route, navigation }) {

   const { item } = route.params;

   const [status, setStatus] = useState(false);

   const [areaText, setAreaText] = useState("");
   const [pinText, setPinText] = useState("");
   const [statusText, setStatusText] = useState(false);

   const toggleSwitch = () => setStatusText(!statusText);

  useEffect(()=>{
    setAreaText(item.area)
    setPinText(item.pin)
    setStatusText(item.status)
  }, [item])

  return (
    <SafeAreaView style={styles.listItem}>
      <View style={{alignItems:"left",flex:1, justifyContent: 'space-between'}}>
      
      <Text>Id: {item.id}</Text>

      <Text>Area:</Text>
      <TextInput onChangeText={setAreaText} value={areaText} editable={status ? true : false}/>
      
      <Text>Pin:</Text>
      <TextInput onChangeText={setPinText} value={pinText} editable={status ? true : false}/>
      
      <Text>Estatus:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={item.status ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        disabled={status ? false : true}
        value={statusText}
      />

      <Button onPress={() =>{
        setStatus(!status);
        if(status == true){
          set(ref(db, 'devices/' + item.id), {
                          area: areaText,
                          status: statusText,
                          pin : pinText
                        });
          setStatus(false)
        }
      }} title={status ? "Guardar" : "Editar"}/>

      <Button title="Eliminar" disabled={status ? false : true} 
          color="#CC0000"
          onPress={() =>{
            if(status == true){
              remove(ref(db, 'devices/' + item.id), {
                              area: areaText,
                              status: statusText,
                              pin : pinText
                            });
              setStatus(false)
              navigation.navigate('Home');
            }
          }}
        
      />

      <Button onPress={() =>{
        setStatus(false);
        navigation.navigate('Home');
      }} title="REGRESAR" />
      
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