import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ScheduleDepartmentScreen from '../../screens/booking/deparment/ScheduleDepartmentScreen';
import Question from '../../screens/diagnose/Diagnose';
import Department from './department';
const Tab = createMaterialTopTabNavigator();
function serviceTap() {
  return (
    <Tab.Navigator
      initialRouteName="BookingDepartmentTab"
      screenOptions={{
        tabBarActiveTintColor: '#85C88A',
        tabBarLabelStyle: {fontSize: 11, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: 'white'},
      }}>
      {/* <Tab.Screen name ="chat" component={}/> */}
      <Tab.Screen
        name="Department"
        component={Department}
        options={{tabBarLabel: 'Chuyên khoa'}}
      />
      <Tab.Screen
        name="Question"
        component={Question}
        options={{tabBarLabel: 'Chẩn đoán'}}
      />
    </Tab.Navigator>
  );
}

export default serviceTap;
