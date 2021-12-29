import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { createRegistration } from "../../store/actions/doctor-registration";
import { AsyncStorage } from "react-native";
import BtnAddComponent from "./BtnAddComponent";
import { Entypo } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { balanceFormat, formatDate, addDays } from "../../utils/string-format";
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
  };
  //const {service} = props.service;
  const addRegistration = () => {
    console.log("registration");
    AsyncStorage.getItem("id").then((res) => {
    if(res) {
      let id = res;
      let registration = {
        name: props.name,
        serviceId: props.serviceId,
        doctorId: props.doctorId,
        status: "CREATED",
        patientId: id,
      };
      createRegistration(registration).then((res) => {
        if (res) {
          props.setRegistration(res);
          props.setPrice(props.price);
          props.payment();
          setModalVisible(false);
        } else {
          Alert.alert("Đăng ký không thành công, lỗi hệ thống!");
        }
      });
    } else console.log("null id");
    });
  };

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
        <Pressable style={styles.modalView}>
          <Pressable style={{ flexDirection: "column", alignItems: "center" }}>
         
            <View style = {{backgroundColor: '#FF7800', height: 5, width: 45, borderRadius: 10}}></View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 20}}>
              {props.name}
            </Text>
            <Text style={{ color: "#009DAE" , marginTop: 5}}>{props.description}</Text>
            <View
              style={{
                borderBottomColor: "#C2FFF9",
                borderBottomWidth: 1,
                width: "80%",
                marginTop: 5,
              }}
            />
          </Pressable>
          <Pressable
            style={{
              padding: 10,
              flexDirection: "column",
              justifyContent: "flex-start",
              // alignItems: "left",
              flex: 1,
              paddingLeft: 30,
              paddingRight: 30,
              marginTop: 10
            }}
          >
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: "#FF5403" }}
              >
                Bác sĩ:{" "}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "500", color: "#FF5403" }}
              >
                {props.nameDoctor}
              </Text>
            </Pressable>
            <Pressable style={{ marginTop: 5, flexDirection: 'row' }}>
              <Text style = {{padding: 5, fontWeight: 'bold', paddingLeft: 0}}>Thời hạn đăng kí:</Text>
              <Text style = {{padding: 5, fontWeight: 'bold'}}>{props.duration}</Text>
              <Text style = {{padding: 5, paddingLeft: 1, fontWeight: 'bold'}}>ngày</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <RadioButton value="first" status={"checked"} />
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 20,
                  color: "#F90716",
                  marginTop: 5,
                }}
              >
                {balanceFormat(props.price)}
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginTop: 10,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text>Ngày đăng ký:</Text>
              <Text
                style={{ color: "#32C1CD", fontWeight: "bold", marginLeft: 5 }}
              >
                {formatDate(currentDate)}
              </Text>
              <Text
                style={{ color: "#32C1CD", fontWeight: "bold", marginLeft: 5 }}
              >
                -
              </Text>
              <Text
                style={{ color: "#32C1CD", fontWeight: "bold", marginLeft: 5 }}
              >
                {formatDate(getDateEnd())}
              </Text>
            </Pressable>
          </Pressable>
          <BtnAddComponent onPress={addRegistration} title={"Đăng ký bác sĩ"} />
        </Pressable>
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
    height: "60%",
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
});

export default AlertDoctorService;
