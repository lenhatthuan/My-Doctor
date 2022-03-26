import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorOrderScreen from '../../screens/service/DoctorOrderScreen';
import Chat from '../../screens/contact/ChatScreen';
const Stack = createNativeStackNavigator();

const DoctorOrder = () => (
    <Stack.Navigator
        screenOptions={
            {title: '', headerShadowVisible: false}
        }
    >
        <Stack.Screen name = "DoctorOrder"  options={{headerShown: false}} component={DoctorOrderScreen}/>
        <Stack.Screen name = "chat"  options={{headerShown: false}} component={Chat}/>
    </Stack.Navigator>
)

export default DoctorOrder;