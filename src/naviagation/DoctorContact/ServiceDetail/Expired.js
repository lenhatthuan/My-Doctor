import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from '../../../screens/service/payment/PaymentScreen';

const Stack = createNativeStackNavigator();
import ExpiredSeviceScreen from '../../../screens/service/ExpiredServiceScreen';
import ServiceDetail from '../../../screens/service/ServiceDetail';
const Expired = () => (
    <Stack.Navigator
    screenOptions={
        {title: '', headerShadowVisible: false}
    }>
        <Stack.Screen name = "ExpiredSevice" options={{headerShown: false}} component={ExpiredSeviceScreen}/>
        <Stack.Screen name = "ServiceDetail" options={{headerShown: false}} component={ServiceDetail}/>
        <Stack.Screen name="payment" component={PaymentScreen}/>

    </Stack.Navigator>
)

export default Expired;