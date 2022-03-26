import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from '../../../screens/service/payment/PaymentScreen';

const Stack = createNativeStackNavigator();
import CreatedSeviceScreen from '../../../screens/service/CreatedServiceScreen';
import ServiceDetail from '../../../screens/service/ServiceDetail';
const Created = () => (
    <Stack.Navigator
    screenOptions={
        {title: '', headerShadowVisible: false}
    }>
        <Stack.Screen name = "CreatedSevice" options={{headerShown: false}} component={CreatedSeviceScreen}/>
        <Stack.Screen name = "ServiceDetail" options={{headerShown: false}} component={ServiceDetail}/>
        <Stack.Screen name="payment" component={PaymentScreen}/>

    </Stack.Navigator>
)

export default Created;