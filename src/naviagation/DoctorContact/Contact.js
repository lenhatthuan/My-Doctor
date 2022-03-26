import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Chat from '../../screens/contact/ChatScreen';

const Contact = () => (
    <Stack.Navigator>
        <Stack.Screen name = "chat" component={Chat}/>
    </Stack.Navigator>
)

export default Contact;