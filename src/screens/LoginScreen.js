import React, { useState, useEffect  } from 'react'
import {Text, TextInput, TouchableOpacity, View } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onLoginPress = () => {
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
                setEmail("");
                setPassword("");
                navigation.navigate('Leds');
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
                <TouchableOpacity
                    onPress={() => onLoginPress()}>
                    <Text >Login</Text>
                </TouchableOpacity>
                <View>
                    <Text onPress={() => navigation.navigate('Register')}>Crear cuenta</Text>
                </View>
        </View>
    )
}