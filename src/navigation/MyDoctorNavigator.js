import React from "react";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SignupScreen from "../screens/nonLogin/SignupScreen";
import ForgotPassScreen from "../screens/nonLogin/ForgotPassScreen";
import OtpAuthScreen from "../screens/nonLogin/OtpAuthScreen";
import SigninScreen from "../screens/nonLogin/SigninScreen";

import HomeScreen from "../screens/Home/HomeScreen";
import MedicalGuideScreen from "../screens/MedicalGuideScreen";
import OnlineMedicalScreen from "../screens/OnlineMedicalScreen";
import OnlinePaymentScreen from "../screens/OnlinePaymentScreen";
import PositionScreen from "../screens/PositionScreen";
import RecordScreen from "../screens/RecordScreen";
import RecordDetailScreen from "../screens/RecordDetailScreen";

import ProfileScreen from "../screens/personal/ProfileScreen";
import ChangeProfileScreen from "../screens/personal/ChangeProfileScreen";
import ChangePassScreen from "../screens/personal/ChangePassScreen";

import ScheduleDepartmentScreen from "../screens/Booking/ByDepartment/ScheduleDepartmentScreen";

import HistoryBMIComponent from "../components/follow-healthy/BMI/HistoryBMIComponent";
import ListBMIComponent from "../components/follow-healthy/BMI/ListBMIComponent";
import FollowHeathyScreen from "../screens/FollowHeathyScreen";
import BMIComponent from "../components/follow-healthy/BMIComponent";
import ContactDetailScreen from "../screens/Contact/ContactDetailScreen";
import ProfileDoctorScreen from "../screens/Booking/ByDoctor/ProfileDoctorScreen";
import DoctorList from "../components/Doctor";
import AllDoctorScreen from "../screens/Booking/ByDoctor/AllDoctorScreen";
import ListHeartComponent from "../components/follow-healthy/heart/ListHeartComponent";
import HistoryHeartComponent from "../components/follow-healthy/heart/HistoryHeartComponent";
import DoctorScheduleScreen from "../screens/Booking/ByDoctor/DoctorScheduleScreen";
import LoadingScreen from "../screens/LoadingScreen";
import PaymentScreen from "../screens/Service/PaymentScreen";
import DoctorOrderScreen from "../screens/Service/DoctorOrderScreen";
import BookingDepartmentScreen from "../screens/Booking/ByDepartment/BookingDepartmentScreen";

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
      {/* <Stack.Screen name="OnlineMedical" component={OnlineMedicalScreen} /> */}
      <Stack.Screen name="DoctorOrder" component={DoctorOrderScreen} />
      <Stack.Screen name="Record" component={RecordScreen} />
      <Stack.Screen name="RecordDetail" component={RecordDetailScreen} />
      <Stack.Screen name="Position" component={PositionScreen} />
      <Stack.Screen name="FollowHeathy" component={FollowHeathyScreen} />
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
      <Stack.Screen name="DoctorProfile" component={ProfileDoctorScreen} />
      <Stack.Screen name="doctor-schedule" component={DoctorScheduleScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
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
      <Stack.Screen name="Schedule" component={ScheduleDepartmentScreen} />
      <Stack.Screen
        name="BookingDepartment"
        component={BookingDepartmentScreen}
      />
      <Stack.Screen name="Position" component={PositionScreen} />
      <Stack.Screen name="Doctor" component={DoctorList} />
      <Stack.Screen name="DoctorProfile" component={ProfileDoctorScreen} />
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
      <Stack.Screen name="ListHeart" component={ListHeartComponent} />
      <Stack.Screen name="HeartHistory" component={HistoryHeartComponent} />
    </Stack.Navigator>
  );
}

// function PersonalNavigation() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerMode: "none",
//       }}
//     >
//       <Stack.Screen name="ChangeProfile" component={ChangeProfileScreen} />
//       <Stack.Screen name="ChangePass" component={ChangePassScreen} />
//     </Stack.Navigator>
//   );
// }

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
        name="Profile"
        component={ProfileScreen}
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
      <Stack.Screen name="loading" component={LoadingScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
      <Stack.Screen name="OTPAuth" component={OtpAuthScreen} />
      <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      <Stack.Screen name="ChangeProfile" component={ChangeProfileScreen} />
      <Stack.Screen name="ChangePass" component={ChangePassScreen} />
    </Stack.Navigator>
  );
}
