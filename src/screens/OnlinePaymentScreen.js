import React , {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import SbNotification from '../components/common/snackbar/SbNotification';
const OnlinePaymentScreen = props =>{

    const [isSnackbar, setIsSnackbar] = useState(false);

    const [messageSb, setMessageSb] = useState("Thành công");

    const onHandleSnackbar = () => {
        setIsSnackbar(false);
    }
    return (
        <View style = {styles.screen}>
           <View>
           <Text>
               ONLINE PAYMENT SCREEN
            </Text>
            <Pressable onPress={() => {
                setIsSnackbar(true);
            }}>
                <View><Text>Snackbar</Text></View>
            </Pressable>
            <SbNotification
            visible = {isSnackbar} message = {messageSb} onPress = {onHandleSnackbar}
            action = "OK"
            ></SbNotification>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default OnlinePaymentScreen;

