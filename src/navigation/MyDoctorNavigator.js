import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Signup from "../screens/SignupScreen";
import ForgotPass from "../screens/ForgotPassScreen";
import Profile from "../screens/ProfileScreen";
import OTPAuth from "../screens/OtpAuthScreen";
import SigninScreen from "../screens/SigninScreen";
import HomeScreen from "../screens/HomeScreen";
import OtpAuthScreen from "../screens/OtpAuthScreen";
import OTPScreen from "../screens/OTPScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import COLORS from "../../assets/colors";
import ContactScreen from '../screens/ContactScreen';
import ScheduleScreen from "../screens/ScheduleScreen";
import FollowHeathyScreen from "../screens/FollowHeathyScreen";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

const defaulStackNavOptions = {};
const MyDoctorNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
      headerVisible: false,
    },
  },
  Signin: {
    screen: SigninScreen,
    navigationOptions: {
      headerShown: false,
      headerVisible: false,
      tabBarVisible:false
    },
  },
  OtpAuth: { screen: OtpAuthScreen },
  OTPScreen: {
    screen: OTPScreen,
  },
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
});

const MyDoctorNavBottom = createBottomTabNavigator(
  {
    Home: {
      screen: MyDoctorNavigator,
      navigationOptions: {
        tabBarLabel: "Trang chủ",
        // tabBarVisible: getTabBarVisibility(),
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="md-home" size={24} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        tabBarLabel: "Liên lạc BS",
        tabBarIcon: (tabInfo) => {
          return (
            <MaterialIcons
              name="contact-mail"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        tabBarLabel: "Đặt lịch khám",
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    FollowHealthy: {
      screen: FollowHeathyScreen,
      navigationOptions: {
        tabBarLabel: "Theo dõi SK",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Cá nhân",
        tabBarIcon: (tabInfo) => {
          return (
            <FontAwesome name="user" size={24} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLORS.TeaGreen,
    },
  }
);

// function  getTabBarVisibility(route) {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : '';

//     console.log("hihi: " + route)

//   if (routeName === 'Signin') {
//     return false;
//   }

//   return true;
// }

function getTabBarVisibility (name) {

  console.log("hihi: " + name)
  if (name === 'Signin') {
    return false;
  }

  return true;
}
export default createAppContainer(MyDoctorNavBottom);
