import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import CreateScreen from "../screens/CreateScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen}  options={{ drawerLabel: 'Home' }} />
      <Drawer.Screen name="Detail" component={DetailScreen}  options={{ drawerLabel: 'Detalle' }} />
      <Drawer.Screen name="Create" component={CreateScreen}  options={{ drawerLabel: 'Crear' }} />
      <Drawer.Screen name="Register" component={RegisterScreen}  options={{ drawerLabel: 'Registrar' }} />
    </Drawer.Navigator>
  );
}