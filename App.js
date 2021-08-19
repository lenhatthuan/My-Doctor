import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "./src/screens/signup";
import ForgotPass from "./src/screens/forgot-pass";
import Profile from "./src/screens/profile";
import OTPAuth from "./src/screens/otp-auth";
const Project = createStackNavigator(
  {
    Signup: {
      screen: Signup,
    },
    OTPAuth: {
      screen: OTPAuth,
    },
    ForgotPass: {
      screen: ForgotPass,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: "Signup",
  }
);
export default createAppContainer(Project);
