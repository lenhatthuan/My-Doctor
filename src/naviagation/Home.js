import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from '../screens/home/Home';
import ServiceTap from './DoctorContact/service';
import Position from '../screens/position/PositionScreen';
import Record from '../screens/record/Record';
import Prescription from '../screens/record/Prescription';
import ImageDetail from '../screens/contact/components/imageDetail';

const Home = () => (
  <Stack.Navigator
    screenOptions={{
      title: '',
      headerStyle: {backgroundColor: '#009387'},
      headerShadowVisible: false,
      headerTintColor: 'white',
    }}>
    <Stack.Screen
      name="HomeSreen"
      options={{headerShown: false}}
      component={HomeScreen}
    />

    <Stack.Screen
      name="Service"
      options={{headerShown: false}}
      component={ServiceTap}
    />

    <Stack.Screen
      name="Position"
      options={{headerShown: false}}
      component={Position}
    />

    <Stack.Screen
      name="Record"
      options={{headerShown: false}}
      component={Record}
    />

    <Stack.Screen
      name="Prescription"
      options={{headerShown: false}}
      component={Prescription}
    />
  </Stack.Navigator>
);
export default Home;
