import React  from 'react';
import {useState, useEffect} from 'react';
import { Modal, View, StyleSheet, Pressable, Image, Text } from 'react-native';

const AlertSendToDoctor = (props) =>{
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(props.visible);
    })

    const onHandlePress = () => {
        props.onPress();
    }

    return (
        <Modal
        transparent={true}
        visible = {props.visible}
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(!modalVisible);}}>
            <View style = {styles.view}>
                <View style = {styles.content}>
                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        height: 60
    },
    view:{
        flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    },
})

export default AlertSendToDoctor;