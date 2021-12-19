import React  from 'react';
import {useState, useEffect} from 'react';
import { Modal, View, StyleSheet, Pressable, Image, Text } from 'react-native';

const SuccessAlert = (props) =>{
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
          Alert.alert("Bạn có chắc thoát.");
          setModalVisible(!modalVisible);}}>
            <View style = {styles.view}>
            <Pressable style = {styles.errorComponent}>
               <View style = {{backgroundColor: 'white', height: 200, width: "90%", borderRadius: 8, alignItems:'center'}}>
                   <Image source={require('../../../assets/imgs/success.gif')} style = {{width: 50, height: 50}}/>
                   <View style = {{borderWidth: 1, width: "100%",borderColor: '#04293A'}}/>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                   <Text style = {{fontWeight: 'bold', color: 'black', fontSize: 18}}>{props.message}</Text>
               </View>
               <Pressable style = {{ justifyContent: 'flex-end', flex: 1, marginBottom: 20}} onPress={() => {
                onHandlePress();
               }}><View style = {{padding: 10, width: 50, borderRadius: 8, backgroundColor: '#FF0000', alignItems: 'center'}}>
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

export default SuccessAlert;