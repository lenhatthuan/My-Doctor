import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ReceiverMessage = ({message}) => {
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
        justifyContent: 'flex-start',
        margin: 5,
        marginRight: 25
    },
    messageContainer: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    message: {
        color: 'black',
        fontSize: 15
    }
})

export default React.memo(ReceiverMessage);