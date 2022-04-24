import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SenderMessage = ({message}) => {
    return (
        <View style = {styles.main}>
            <View style = {styles.messageContainer}><Text style = {styles.message}>{message}</Text></View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 5,
        marginLeft: 25
    },
    messageContainer: {
        backgroundColor: '#42C2FF',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    message: {
        color: 'white',
        fontSize: 15
    }
})

export default React.memo(SenderMessage);