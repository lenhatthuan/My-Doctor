import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Healthy from '../screens/healthy/Healthy';
import Bmi from '../screens/healthy/Bmi';
import Emotion from '../screens/healthy/Emotion';
import HeartBeat from '../screens/healthy/HeartBeat';
//import Healthy from '../screens/healthy/Healthy';

const FollowHealthy = () => (
  <Stack.Navigator
    screenOptions={{
      title: '',
      headerShadowVisible: false,
    }}>
    <Stack.Screen
      name="Healthy"
      options={{headerShown: false}}
      component={Healthy}
    />
    <Stack.Screen name="Bmi" component={Bmi} />
    <Stack.Screen name="Emotion" component={Emotion} />
    <Stack.Screen name="HeartBeat" component={HeartBeat} />
    {/* <Stack.Screen name="HeartBeat" component={HeartBeat} /> */}
  </Stack.Navigator>
);

export default FollowHealthy;
