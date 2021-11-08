import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, StyleSheet, Modal, Platform} from 'react-native';
import STRING from '../../utils/string';
import BtnAddComponent from './BtnAddComponent';
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker  from "@react-native-community/datetimepicker";
const AddFitlerComponent = props =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [platform, setPlatform] = useState('default')
    const isDatePickerVisible = true;
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
       // if(Platform.OS =='ios') 
        ///setShow(Platform.OS ==='ios');
        setShow(false);
        setDate(currentDate);
      };

     useEffect(() => {
       setModalVisible(props.visible);
       if(Platform.OS =='ios') setPlatform('inline');
    })

    const onPress = () =>{
        props.setDateFilter(date);
        props.onPress();
    }

    const onCanCel = () =>{
        props.onCancel();
    }

    const onCanCelFilter = () =>{
        props.onCancelFilter();
    }
    
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Bạn có chắc thoát.");
          setModalVisible(!modalVisible);
        }}>
        <Pressable style = {styles.view} onPress = {() =>{
            onCanCel();
        }}>
        <Pressable style = {styles.main} onPress = {() =>{}}>
        <View style = {styles.header}>
        <Pressable style={styles.iconHeader}
        onPress = {() =>{
            onCanCel();
        }}>
              <FontAwesome name="remove" size={24} color="black" />
            </Pressable>
            <Pressable style = {styles.viewTxtHeader}
              onPress = {() =>{
                onCanCelFilter();
            }}>
              <Text style={styles.txtHeader}>Bỏ lọc</Text>
            </Pressable>
        </View>
        <View style = {styles.body}>
        <DateTimePicker 
         testID="dateTimePicker"
         value={date}
         mode={mode}
        display= {platform}
         onChange={onChange}
      />
        </View>
            <BtnAddComponent
                onPress = {onPress}
                title = {STRING.choose}
            />
        </Pressable>
        </Pressable>
    </Modal>)
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    },
    main:{
        width: "100%",
        height: "70%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        paddingTop: 10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconHeader:{
        flex:1,
        paddingLeft: 20,

    },
    viewTxtHeader:{
        flex:1,
        alignItems:'flex-end',
        paddingRight: 20
    },
    header:{
        flexDirection:'row',
        alignItems:'center'
    },
    body:{
        // flex:1
    },
    txtHeader:{
        fontWeight:'bold'
    }
})
export default AddFitlerComponent;