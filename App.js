import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./src/screens/HomeScreen"
import CreateScreen from "./src/screens/CreateScreen"
import DetailScreen from "./src/screens/DetailScreen"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './src/screens/LoginScreen';
import { getAuth } from "firebase/auth";
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';


const HomeStack = createNativeStackNavigator();  // navegador global 

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}
      options={{
        headerShown: false, // change this to `false`
    }} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabBottomScreen() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name="Leds" 
          component={HomeStackScreen}  
          options={{
          tabBarLabel: 'Leds',
          tabBarIcon: ({ size }) => (
              <MaterialCommunityIcons name="home" color={"#2196f3"} size={size} />
            )
          }}
        />

        <Tab.Screen 
          name="Crear" 
          component={CreateScreen}
           options={{
              tabBarLabel: 'Crear',
              tabBarIcon: ({ size }) => (
                <MaterialCommunityIcons name="plus" color={"#2196f3"} size={size} />
              )
            }}
        />
        <Tab.Screen 
          name="Perfil" 
          component={ProfileScreen}
           options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: ({ size }) => (
                <MaterialCommunityIcons name="account" color={"#2196f3"} size={size} />
              )
            }}
        />
      </Tab.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();  

export default function App() {
    const auth = getAuth();
    const user = auth.currentUser;
  return (
    <NavigationContainer>
      { user ? (
        <TabBottomScreen/>
      ) : (
        <LoginStack.Navigator>
          <LoginStack.Screen name="Login" component={LoginScreen}/>
          <LoginStack.Screen name="Register" component={RegisterScreen}/>
          <LoginStack.Screen name="Leds" component={TabBottomScreen} 
                options={{
                  headerShown: false, // change this to `false`
                }}
          />
          
        </LoginStack.Navigator>
      )
    }
    </NavigationContainer>
  );
} 