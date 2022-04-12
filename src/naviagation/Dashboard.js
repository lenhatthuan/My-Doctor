import React from 'react';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Personal from './Personal';
import FollowHealthy from './FollowHealthy';
import VNPay from '../screens/payment/VNPay';
import Home from './Home';
import DoctorBooking from './DoctorBooking';
import MainDepartmentScreen from '../screens/booking/deparment/Main';
import HeathyNavigator from './follow-heathy/HeathyNavigator';
const Dashboard = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: '#009387',
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Trang chủ',
        tabBarIcon: ({color}) => <Icon name="home" color={color} />,
      }}
    />

      <Tab.Screen
      name="DoctorBooking"
      component={DoctorBooking}
      options={{
        title: 'Bác sĩ',
        tabBarIcon: ({color}) => (
          <Icon name="calendar-plus-o" type="font-awesome" color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="FollowHealthy"
      component={HeathyNavigator}
      options={{
        title: 'Sức khỏe',
        tabBarIcon: ({color}) => (
          <Icon name="heartbeat" type="font-awesome" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={MainDepartmentScreen}
      options={{
        title: 'Khám bệnh',
        tabBarIcon: ({color}) => <Icon type="font-awesome" name="bookmark-o" color={color} />,
      }}
    />
    <Tab.Screen
      name="Personal"
      component={Personal}
      options={{
        title: 'Cá nhân',
        tabBarIcon: ({color}) => <Icon name="person" color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default Dashboard;
