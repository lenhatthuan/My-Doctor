import React from 'react';
import { Modal, View, useState, StyleSheet, Button, Pressable } from 'react-native';

const ErrorAlert = (props) =>{
    return (
        <Modal
        transparent={true}
        visible = {props.visible}
        animationType="fade"
        onRequestClose={() => {
          Alert.alert("Bạn có chắc thoát.");
          setModalVisible(!modalVisible);}}>
            <Pressable style = {styles.errorComponent}>
               <View>
               <Text>{props.title}</Text>
                <Button title = 'OK'/>
               </View>
            </Pressable>
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