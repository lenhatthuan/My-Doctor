import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "./src/screens/signup.screen";
import ForgotPass from "./src/screens/forgot-pass.screen";
import Profile from "./src/screens/profile.screen";
import OTPAuth from "./src/screens/otp-auth.screen";
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
