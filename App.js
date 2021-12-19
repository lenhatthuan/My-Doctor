import React, { Children, Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDoctorNavigation from "./src/navigation/MyDoctorNavigator";
import { SceneView, TabRouter } from "react-navigation";
import InitScreen from "./src/screens/InitScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
import { LogBox } from 'react-native';

export default function App() {

  LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  ]);
  
  return (
    <NavigationContainer>
    <MyDoctorNavigation />
  </NavigationContainer>
  );
}
