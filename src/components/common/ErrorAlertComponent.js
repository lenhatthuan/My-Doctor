import React  from 'react';
import {useState, useEffect} from 'react';
import { Modal, View, StyleSheet, Pressable, Image, Text } from 'react-native';

const ErrorAlert = (props) =>{
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(props.visible);
    })

    const onHandlePress = () => {
        props.onCancel();
    }

    return (
        <Modal
        transparent={true}
        visible = {props.visible}
        animationType="fade"
        onRequestClose={() => {
          Alert.alert("Bạn có chắc thoát.");
          setModalVisible(!modalVisible);}}>
            <View style = {styles.view}>
            <Pressable style = {styles.errorComponent}>
               <View style = {{backgroundColor: 'white', height: 150, width: "90%", borderRadius: 8, alignItems:'center'}}>
                   <Image source={require('../../../assets/imgs/error.gif')} style = {{width: 50, height: 50}}/>
                   <View style = {{borderWidth: 1, width: "100%",borderColor: '#04293A'}}/>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                   <Text style = {{fontWeight: 'bold', color: 'black', fontSize: 15, paddingLeft: 10, paddingRight: 10, alignItems:'center', textAlign: 'center'}}>{props.message}</Text>
               </View>
               <Pressable style = {{ justifyContent: 'flex-end', flex: 1, marginBottom: 10}} onPress={() => {
                onHandlePress();
               }}><View style = {{padding: 10, paddingTop: 5, paddingBottom: 5, width: 50, borderRadius: 8, backgroundColor: '#00AF91', alignItems: 'center'}}>
                   <Text style = {{fontWeight: 'bold', color: 'white'}}>OK</Text>
                   </View> 
               </Pressable>
              </View>
               </View>
            </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    errorComponent:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    view:{
        flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    },
})

export default ErrorAlert;