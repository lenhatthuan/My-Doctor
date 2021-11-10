import React, { Children, Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDoctorNavigation from "./src/navigation/MyDoctorNavigator";
import { SceneView, TabRouter } from "react-navigation";
import InitScreen from "./src/screens/InitScreen";
import LoadingScreen from "./src/screens/LoadingScreen";

export default function App() {
  return (
    <NavigationContainer>
    <MyDoctorNavigation />
  </NavigationContainer>
  );
}
