import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import ScheduleDepartmentScreen from '../../screens/booking/deparment/ScheduleDepartmentScreen';
import BookingDepartmentScreen from '../../screens/booking/deparment/BookingDepartmentScreen';
const Department = () => (
  <Stack.Navigator screenOptions={{title: '', headerShadowVisible: false}}>
    <Stack.Screen
      name="ScheduleDepartment"
      options={{headerShown: false}}
      component={ScheduleDepartmentScreen}
    />
    <Stack.Screen
      name="BookingDepartment"
      options={{headerShown: false}}
      component={BookingDepartmentScreen}
    />
  </Stack.Navigator>
);

export default Department;
