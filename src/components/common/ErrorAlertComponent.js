import React from 'react';
import { Modal, View, useState, StyleSheet, Button } from 'react-native';

const ErrorAlert = (props) =>{

    return (
        <Modal
        transparent={true}
        visible = {props.visible}>
            <View style = {styles.errorComponent}>
                <Text>{props.title}</Text>
                <Button title = 'OK'/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    errorComponent:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ErrorAlert;