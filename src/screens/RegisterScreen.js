import React, { useState } from 'react'
import {Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from '../firebase/config';
import {ref, set} from "firebase/database";

export default function RegisterScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords no coinciden.")
            return
        }
        
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
             const uid = userCredential.user.uid;
            //set(ref(db, 'devices/' + userCredential.uid));
            //push(child(ref(db), 'devices/'+userCredential.uid));
            set(ref(db, 'users/' + uid), {
                profile:{
                    fullName: fullName,
                    email: email,
                }
            }).then(()=> navigation.navigate('Leds'))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode + " " + errorMessage)
            });
        

    }



    return (
        <View>
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
                <TouchableOpacity
              
                    onPress={() => onRegisterPress()}>
                    <Text >Crear cuenta</Text>
                </TouchableOpacity>
                <View>
                    <Text >¿Ya tienes cuenta? <Text >Log in</Text></Text>
                </View>
        </View>
    )
}