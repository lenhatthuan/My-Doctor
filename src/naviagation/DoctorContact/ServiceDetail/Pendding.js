import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from '../../../screens/service/payment/PaymentScreen';

const Stack = createNativeStackNavigator();
import PenddingSeviceScreen from '../../../screens/service/PenddingServiceScreen';
import ServiceDetail from '../../../screens/service/ServiceDetail';
const Pendding = () => (
    <Stack.Navigator
    screenOptions={
        {title: '', headerShadowVisible: false}
    }>
        <Stack.Screen name = "PenddingSevice" options={{headerShown: false}} component={PenddingSeviceScreen}/>
        <Stack.Screen name = "ServiceDetail" options={{headerShown: false}} component={ServiceDetail}/>
        <Stack.Screen name="payment" component={PaymentScreen}/>

    </Stack.Navigator>
)

export default Pendding;