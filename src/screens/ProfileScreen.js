import React,  { useEffect, useState } from 'react';
import {Text, TextInput, TouchableOpacity, View, Button} from 'react-native'
import { getAuth, updateEmail, updatePassword, signOut } from "firebase/auth";
import db from '../firebase/config';
import {ref, onValue, set} from "firebase/database";

export default function ProfileScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

useEffect(()=>{
        const uid = getAuth().currentUser.uid;
        console.log(`users/${uid}/profile`);
        const dbRef = ref(db, `users/${uid}/profile`);
        onValue(dbRef, (snapshot) => {
            console.log(snapshot.val())
            setFullName(snapshot.val().fullName)
            setEmail(snapshot.val().email)
        })
  }, [])

    const onUpdatePress = () => {

        const auth = getAuth();
        updateEmail(auth.currentUser, email).then(() => {
            set(ref(db, 'users/' + auth.currentUser.uid + '/profile'), {
                          email: email,
                          fullName: fullName
                });
        }).catch((error) => {
            console.log('Error updating user:', error);
        });

        if(password !== ""){
              if (password !== confirmPassword) {
                 alert("Passwords no coinciden.")
                return
              }
              updatePassword(auth.currentUser, password).then(() => {
                    console.log("password modificado")
                }).catch((error) => {
                    console.error(error)
                });
        }

    }

    return (
        <View style={{alignItems:"left",flex:1, justifyContent: 'space-between'}}>
                <TextInput
                    placeholder='Nombre'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <View>
                    <Button  onPress={() => onUpdatePress()} title="Modificar" />
                </View>
                <View>

                </View>

                <View>
                    <Button onPress={() =>{
                        const auth = getAuth();
                        signOut(auth).then(() => {
                            navigation.navigate('Login');
                        }).catch((error) => {
                        // An error happened.
                        });

                    }} title="Cerrar sesión" />
                </View>
        </View>
    )
}