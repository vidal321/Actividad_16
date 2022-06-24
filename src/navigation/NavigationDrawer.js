import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreens";
import DetailScreen from "../screens/DetailScreen";

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Detail" component={DetailScreen} />
    </Drawer.Navigator>
  );
}