import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// auth
import Welcome from './src/screens/auth/Welcome';
import SignIn from './src/screens/auth/SignIn';
import SignUp from './src/screens/auth/SignUp';
import ForgotPass from './src/screens/auth/ForgotPass';
import OtpAuth from './src/screens/auth/OtpAuth';

import Dashboard from './src/naviagation/Dashboard';

import ServiceDetail from './src/screens/service/ServiceDetail';
import PaymentScreen from './src/screens/service/payment/PaymentScreen';

import {LogBox} from 'react-native';
import ChatDetailScreen from './src/screens/contact/ChatScreen';
import ChatScreen from './src/screens/contact/ListChatScreen';
const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="ServiceDetail"
          options={{headerShown: false}}
          component={ServiceDetail}
        />

        <Stack.Screen name="payment" component={PaymentScreen} />
        <Stack.Screen
          name="OtpAuth"
          component={OtpAuth}
          options={{
            title: '',
            headerStyle: {backgroundColor: '#009387'},
            headerShadowVisible: false,
            headerShown: true,
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="ChatScreen"
          options={{headerShown: false}}
          component={ChatScreen}
        />
        <Stack.Screen
          name="ChatDetailScreen"
          options={{headerShown: false}}
          component={ChatDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
