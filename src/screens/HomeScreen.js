import React, { useEffect, useState } from 'react';
import {FlatList, SafeAreaView, Button} from 'react-native';
import db from './../../src/firebase/config';
import {ref, onValue} from "firebase/database";
import Led from '../components/Led';
import { getAuth } from "firebase/auth";

export default function HomeScreen({ navigation }) {

  const [listDevices, setlistDevices] = useState([]);

  const  readData = () => {
    const auth = getAuth();
    const user = auth.currentUser.uid;
    const dbRef = ref(db, 'users/' + user + '/devices/');
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
      <FlatList
          data={listDevices}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <Led item={item} navigation={navigation}/>
          )}
      />
    </SafeAreaView>
  );
}