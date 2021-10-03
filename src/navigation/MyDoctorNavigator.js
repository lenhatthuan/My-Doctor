import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Signup from "../screens/SignupScreen";
import ForgotPass from "../screens/ForgotPassScreen";
import Profile from "../screens/ProfileScreen";
import OTPAuth from "../screens/OtpAuthScreen";
import SigninScreen from "../screens/SigninScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import COLORS from "../../assets/colors";
import ContactScreen from "../screens/ContactScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import FollowHeathyScreen from "../screens/FollowHeathyScreen";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import STTScreen from "../screens/STTScreen";
import OnlineMedicalScreen from "../screens/OnlineMedicalScreen";
import OnlinePaymentScreen from "../screens/OnlinePaymentScreen";
import RecordScreen from "../screens/RecordScreen";
import MedicalGuideScreen from "../screens/MedicalGuideScreen";
import ChangePass from "../screens/ChangePassScreen";
import HistoryBMIComponent from "../components/follow-healthy/BMI/HistoryBMIComponent";
import ListBMIComponent from "../components/follow-healthy/BMI/ListBMIComponent";
const defaulStackNavOptions = { headerShown: false, headerVisible: false };
const MyDoctorNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Signin: {
      screen: SigninScreen,
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
      navigationOptions: {
        headerShown: false,
        headerVisible: false,
      },
    },
    ChangePass:{
      screen: ChangePass
    },
    FollowHeathy: { screen: FollowHeathyScreen },
    STT: { screen: STTScreen },
    OnlineMedical: { screen: OnlineMedicalScreen },
    OnlinePayment: { screen: OnlinePaymentScreen },
    Record: { screen: RecordScreen },
    Guide: { screen: MedicalGuideScreen },
    BMIHistory: { screen: HistoryBMIComponent },
    ListBMI: {screen: ListBMIComponent},
  },
  {
    defaultNavigationOptions: defaulStackNavOptions,
  }
);

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

MyDoctorNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  let routeName = navigation.state.routes[navigation.state.index].routeName;

  if (checkHideBottomTab(routeName)) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

function checkHideBottomTab(routeName) {
  let aName = ["Signin", "Signup", "OTPAuth", "ForgotPass", "BMIHistory"];
  if (aName.includes(routeName)) return true;
  return false;
}

export default createAppContainer(MyDoctorNavBottom);
