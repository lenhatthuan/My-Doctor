import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AllDoctorScreen from '../screens/booking/doctor/AllDoctor';
import DoctorProfile from '../screens/booking/doctor/DoctorProfile';
import PaymentScreen from '../screens/service/payment/PaymentScreen';
import ServiceDetail from '../screens/service/ServiceDetail';
import DoctorSchedule from '../screens/booking/doctor/DoctorScheduleScreen';
const FollowHealthy = () => (
  <Stack.Navigator
    screenOptions={{
      title: '',
      headerShadowVisible: false,
    }}>
    <Stack.Screen
      name="AllDoctor"
      options={{headerShown: false}}
      component={AllDoctorScreen}
    />
    <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
    <Stack.Screen name="payment" component={PaymentScreen}/>
    <Stack.Screen name="ServiceDetail" component={ServiceDetail}/>
    <Stack.Screen name="DoctorSchedule"options={{headerShown: false}} component={DoctorSchedule}/>
  </Stack.Navigator>
);

export default FollowHealthy;