import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, Button} from 'react-native';
import db from './../../src/firebase/config';
import {ref, onValue} from "firebase/database";
import Led from '../components/Led';

export default function HomeScreen({ navigation }) {

  const [listDevices, setlistDevices] = useState([]);

  const  readData = () => {
    const dbRef = ref(db, 'devices');
    onValue(dbRef, (snapshot) => {
        let records = [];
          snapshot.forEach(childSnapshot => {
              records.push({...childSnapshot.val(), id: childSnapshot.key })
          });
        setlistDevices(records)
    })
  }

  useEffect(()=>{
    readData();
  }, [])

  return (
    <SafeAreaView>
      
      <Button onPress={() =>{
        navigation.navigate('Create');
      }} title="Crear" />

      <FlatList
          data={listDevices}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <Led item={item} navigation={navigation}/>
          )}
      />

        <Button onPress={() =>{
        navigation.navigate('Register');
      }} title="Registrarse" />
      
    </SafeAreaView>
  );
}