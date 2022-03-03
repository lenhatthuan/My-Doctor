import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Profile from '../screens/personal/Profile';
import ChangePass from '../screens/personal/ChangePass';
import UpdateProfile from '../screens/personal/UpdateProfile';

const Personal = () => (
  <Stack.Navigator
    screenOptions={{
      title: '',
      headerStyle: {backgroundColor: '#009387'},
      headerShadowVisible: false,
      headerTintColor: 'white',
    }}>
    <Stack.Screen
      name="Profile"
      options={{headerShown: false}}
      component={Profile}
    />
    <Stack.Screen name="ChangePass" component={ChangePass} />
    <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
  </Stack.Navigator>
);

export default Personal;
