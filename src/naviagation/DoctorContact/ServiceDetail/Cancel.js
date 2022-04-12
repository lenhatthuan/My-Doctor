import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import CancelSeviceScreen from '../../../screens/service/CancelServiceScreen';
import ServiceDetail from '../../../screens/service/ServiceDetail';
import PaymentScreen from '../../../screens/service/payment/PaymentScreen';
const Cancel = () => (
    <Stack.Navigator
    screenOptions={
        {title: '', headerShadowVisible: false}
    }>
        <Stack.Screen name = "CancelSevice" options={{headerShown: false}} component={CancelSeviceScreen}/>
        <Stack.Screen name = "ServiceDetail" options={{headerShown: false}} component={ServiceDetail}/>
        <Stack.Screen name="payment" component={PaymentScreen}/>
    </Stack.Navigator>
)

export default Cancel;