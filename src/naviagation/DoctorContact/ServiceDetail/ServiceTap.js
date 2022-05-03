import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import ServiceDetail from '../../../screens/service/ServiceDetail';
import PaymentScreen from '../../../screens/service/payment/PaymentScreen';
import Service from '../service';

const ServiceTap = () => (
  <Stack.Navigator screenOptions={{title: '', headerShadowVisible: false}}>
    <Stack.Screen
      name="SeviceMain"
      options={{headerShown: false}}
      component={Service}
    />
    <Stack.Screen
      name="ServiceDetail"
      options={{headerShown: false}}
      component={ServiceDetail}
    />
    <Stack.Screen name="payment" component={PaymentScreen} />
  </Stack.Navigator>
);

export default ServiceTap;
