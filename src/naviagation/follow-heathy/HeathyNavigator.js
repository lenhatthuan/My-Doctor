import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FollowHeathyScreen from '../../screens/healthy/FollowHeathyScreen';
import HistoryBMIComponent from '../../components/common/follow-healthy/BMI/HistoryBMIComponent';
import BMIComponent from '../../components/common/follow-healthy/BMIComponent';
import ListBMIComponent from '../../components/common/follow-healthy/BMI/ListBMIComponent';
import ListHeartComponent from '../../components/common/follow-healthy/heart/ListHeartComponent';
import HistoryHeartComponent from '../../components/common/follow-healthy/heart/HistoryHeartComponent';

const Stack = createNativeStackNavigator();
function HeathyNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'none',
      }}>
      <Stack.Screen
        name="FollowHeathy"
        component={FollowHeathyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BMIHistory"
        component={HistoryBMIComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BMI"
        component={BMIComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListBMI"
        component={ListBMIComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HeartHistory"
        component={HistoryHeartComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListHeart"
        component={ListHeartComponent}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HeathyNavigator;
