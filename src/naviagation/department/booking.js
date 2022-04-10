import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ScheduleDepartmentScreen from '../../screens/booking/deparment/ScheduleDepartmentScreen';
import Question from "../../screens/diagnose/Diagnose";
const Tab = createMaterialTopTabNavigator();
function serviceTap() {
  return (
    <Tab.Navigator
      initialRouteName="BookingDepartment"
      screenOptions={{
        tabBarActiveTintColor: '#85C88A',
        tabBarLabelStyle: {fontSize: 11, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: 'white'},
      }}>

        {/* <Tab.Screen name ="chat" component={}/> */}
      <Tab.Screen
        name="Department"
        component={ScheduleDepartmentScreen}
        options={{tabBarLabel: 'Chuyên khoa'}}
      />
      <Tab.Screen
        name="Question"
        component={Question}
        options={{tabBarLabel: 'Chuẩn đoán'}}
      />
      
    </Tab.Navigator>
  );
}

export default serviceTap;
