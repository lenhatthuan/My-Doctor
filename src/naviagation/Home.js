import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from '../screens/home/Home';
import Service from '../screens/service/MainServiceScreen';
const Home = () => (
    <Stack.Navigator
        screenOptions= {{
            title: '',
            headerStyle: {backgroundColor: '#009387'},
            headerShadowVisible: false,
            headerTintColor: 'white'
        }}
    >
        
        <Stack.Screen
            name = "HomeSreen"
            options={{headerShown: false}}
            component={HomeScreen}
        />
        
        <Stack.Screen
            name="Service"
            options={{headerShown: false}}
            component={Service}
        />

    </Stack.Navigator>
);
export default Home;
