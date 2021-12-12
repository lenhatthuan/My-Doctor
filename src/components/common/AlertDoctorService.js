import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {createRegistration} from "../../store/actions/doctor-registration"
import { AsyncStorage } from "react-native";
import BtnAddComponent from "./BtnAddComponent";
import { Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import {balanceFormat, formatDate, addDays} from '../../utils/string-format'
const AlertDoctorService = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setModalVisible(props.visible);
  });

  const cancelGoalHandler = () => {
    props.onCancel();
  };

  const getDateEnd = () => {
    return addDays(currentDate, props.duration);
  }
  //const {service} = props.service;
  const addRegistration = () => {
    AsyncStorage.getItem("id").then(res => {
      let id = res;
      let registration = {
        name: props.name,
        serviceId: props.serviceId,
        doctorId: props.doctorId,
        status: "CREATED",
        patientId: id
      }
      createRegistration(registration).then(res =>{
       if(res) {
         props.setRegistration(res);
         props.setPrice(props.price);
         props.payment();
          setModalVisible(false);
       } else {
         Alert.alert("Đăng ký không thành công, lỗi hệ thống!");
       }
      })
    })
  }


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Bạn có chắc thoát.");
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          cancelGoalHandler();
        }}
      >
          <View style = {styles.modalView}>
            <View style= {{flexDirection: 'colunm', alignItems:'center'}}>
            <Entypo name="dots-three-horizontal" size={24} color="#FF7800" />
                 <Text style = {{fontWeight: 'bold', fontSize: 20}}>
                {props.name}
                </Text>
                <Text style = {{color: '#009DAE'}}>{props.description}</Text>
              <View
                style={{
                  borderBottomColor: '#C2FFF9',
                  borderBottomWidth: 1, width: "80%", marginTop: 5
                }}
              />
               </View>
                <View style = {{padding: 10,flexDirection:'column', justifyContent:'flex-start', alignItems:'left', flex: 1}}>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                <Text style = {{fontSize: 15, fontWeight: '500', color: '#FF5403'}}>Bác sĩ: </Text>
                <Text style = {{fontSize: 15, fontWeight: '500', color: '#FF5403'}}>{props.nameDoctor}</Text>
                </View>
               <View style = {{marginTop: 5}}>
                <Text>Thời hạn đăng kí:</Text>
                <Text>{props.duration}</Text>
               </View>
                <View  style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', marginLeft: 10}}>
                 <RadioButton
                  value="first"
                  status={'checked'}
              />
                <Text style = {{fontWeight: '800', fontSize: 20, color: '#F90716', marginTop: 5}}>{balanceFormat(props.price)}</Text>
                </View>
                <View style = {{marginTop: 10, alignItems:'center', flexDirection:'row'}}>
                <Text>Ngày đăng ký:</Text>
                <Text style = {{color: '#32C1CD', fontWeight:'500',marginLeft: 5}}>{formatDate(currentDate)}</Text>
                 <Text style = {{color: '#32C1CD', fontWeight:'500',marginLeft: 5}}>-</Text>
                <Text style = {{color: '#32C1CD', fontWeight:'500', marginLeft: 5}}>{formatDate(getDateEnd())}</Text>
                </View> 
               </View>
                <BtnAddComponent
            onPress = {addRegistration}
            title = "Đăng ký bác sĩ"

          />
          </View>
        </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  modalView: {
    width: "100%",
    height: "50%",
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
  }
});

export default AlertDoctorService;
