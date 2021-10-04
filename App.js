import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyDoctorNavigation from "./src/navigation/MyDoctorNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MyDoctorNavigation />
    </NavigationContainer>
  );
}
