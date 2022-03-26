import React from 'react';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Personal from './Personal';
import FollowHealthy from './FollowHealthy';
import VNPay from '../screens/payment/VNPay';
import Home from './Home';
import DoctorBooking from './DoctorBooking';

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
      component={FollowHealthy}
      options={{
        title: 'Sức khỏe',
        tabBarIcon: ({color}) => (
          <Icon name="heartbeat" type="font-awesome" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Payment"
      component={VNPay}
      options={{
        title: 'Thanh toán',
        tabBarIcon: ({color}) => <Icon name="payment" color={color} />,
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
