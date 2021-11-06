import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SignupScreen from "../screens/SignupScreen";
import ForgotPassScreen from "../screens/ForgotPassScreen";
import OtpAuthScreen from "../screens/OtpAuthScreen";
import SigninScreen from "../screens/SigninScreen";

import HomeScreen from "../screens/HomeScreen";
import MedicalGuideScreen from "../screens/MedicalGuideScreen";
import OnlineMedicalScreen from "../screens/OnlineMedicalScreen";
import OnlinePaymentScreen from "../screens/OnlinePaymentScreen";
import PositionScreen from "../screens/PositionScreen";
import RecordScreen from "../screens/RecordScreen";

import ProfileScreen from "../screens/ProfileScreen";
import ChangePassScreen from "../screens/ChangePassScreen";

import ContactScreen from "../screens/ContactScreen";

import ScheduleScreen from "../screens/ScheduleScreen";

import HistoryBMIComponent from "../components/follow-healthy/BMI/HistoryBMIComponent";
import ListBMIComponent from "../components/follow-healthy/BMI/ListBMIComponent";
import FollowHeathyScreen from "../screens/FollowHeathyScreen";
import BMIComponent from "../components/follow-healthy/BMIComponent";
import ContactDetailScreen from "../screens/ContactDetailScreen";
import ProfileDoctorScreen from "../screens/ProfileDoctorScreen";
import DoctorList from "../components/Doctor";
import AllDoctorScreen from "../screens/AllDoctorScreen";
import ListHeartComponent from "../components/follow-healthy/heart/ListHeartComponent";
import HistoryHeartComponent from "../components/follow-healthy/heart/HistoryHeartComponent";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="OnlinePayment" component={OnlinePaymentScreen} />
      <Stack.Screen name="Guide" component={MedicalGuideScreen} />
      <Stack.Screen name="OnlineMedical" component={OnlineMedicalScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="Position" component={PositionScreen} />
    </Stack.Navigator>
  );
}

function ContactNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
       <Stack.Screen name="AllDoctor" component={AllDoctorScreen} />
       <Stack.Screen name="DoctorProfile" component={ProfileDoctorScreen}/>
      <Stack.Screen name = "Chat" component = {ContactDetailScreen} />
    </Stack.Navigator>
  );
}

function BookingNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Position" component={PositionScreen} />
      <Stack.Screen name="Doctor" component={DoctorList}/>
      <Stack.Screen name="DoctorProfile" component={ProfileDoctorScreen}/>
    </Stack.Navigator>
  );
}

// function HomeTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Feed" component={Feed} />
//       <Tab.Screen name="Notifications" component={Notifications} />
//     </Tab.Navigator>
//   );
// }

function HealthyNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen name="FollowHeathy" component={FollowHeathyScreen} />
      <Stack.Screen name="BMIHistory" component={HistoryBMIComponent} />
      <Stack.Screen name="BMI" component={BMIComponent} />
      <Stack.Screen name="ListBMI" component={ListBMIComponent} />
      <Stack.Screen name = "ListHeart" component = {ListHeartComponent}/>
      <Stack.Screen name="HeartHistory" component={HistoryHeartComponent} />
    </Stack.Navigator>
  );
}

function PersonalNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ChangePass" component={ChangePassScreen} />
    </Stack.Navigator>
  );
}

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ContactNavigation"
        component={ContactNavigation}
        options={{
          tabBarLabel: "Tư vấn",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="forum" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="BookingNavigation"
        component={BookingNavigation}
        options={{
          tabBarLabel: "Đặt lịch khám",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="HealthyNavigation"
        component={HealthyNavigation}
        options={{
          tabBarLabel: "Sức khỏe",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="PersonalNavigation"
        component={PersonalNavigation}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default function MyDoctorNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "none",
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="OTPAuth" component={OtpAuthScreen} />
    </Stack.Navigator>
  );
}
