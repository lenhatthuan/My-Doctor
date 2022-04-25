import React from 'react';
//import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

// auth
import Welcome from './src/screens/auth/Welcome';
import WelcomeHome from './src/screens/auth/WelcomeHome';
import SignIn from './src/screens/auth/SignIn';
import SignUp from './src/screens/auth/SignUp';
import ForgotPass from './src/screens/auth/ForgotPass';
import OtpAuth from './src/screens/auth/OtpAuth';

import Dashboard from './src/naviagation/Dashboard';

import Diagnose from './src/screens/diagnose/Diagnose';
import {LogBox} from 'react-native';
import {isLogin} from './src/store/actions/account';
import ChatScreen from './src/screens/contact/ChatScreen';
const App = () => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Diagnose" component={Diagnose} /> */}
        {isLogin ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
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
            <Stack.Screen name="Dashboard" component={Dashboard} />

            <Stack.Screen
              name="ChatScreen"
              options={{headerShown: false}}
              component={ChatScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeHome" component={WelcomeHome} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
