import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentScreen from '../../../screens/service/payment/PaymentScreen';

const Stack = createNativeStackNavigator();
import ComfirmedSeviceScreen from '../../../screens/service/ComfirmedServiceScreen';
import ServiceDetail from '../../../screens/service/ServiceDetail';
const Comfirmed = () => (
  <Stack.Navigator screenOptions={{title: '', headerShadowVisible: false}}>
    <Stack.Screen
      name="ComfirmedSevice"
      options={{headerShown: false}}
      component={ComfirmedSeviceScreen}
    />
    <Stack.Screen
      name="ServiceDetail"
      options={{headerShown: false}}
      component={ServiceDetail}
    />
    <Stack.Screen name="payment" component={PaymentScreen} />
  </Stack.Navigator>
);

export default Comfirmed;
