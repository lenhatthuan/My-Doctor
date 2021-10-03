import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../../../assets/colors"
import { FontAwesome } from "@expo/vector-icons";
import BtnAddComponent from "../../common/BtnAddComponent";
import STRING from "../../../utils/string";

const AddBMIComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  useEffect(() => {
    setModalVisible(props.visible);
  });

  const cancelGoalHandler = () => {
    props.onCancel();
  };

  const onSave = () =>{
    console.log("Save component!!")
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
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View style={styles.iconHeader}>
              <FontAwesome name="remove" size={24} color="black" />
            </View>
            <View style = {styles.viewTxtHeader}>
              <Text style={styles.txtHeader}>Thêm dữ liệu</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyComponent}>
              <Text style={styles.txtBody}>Chiều cao (cm)</Text>
              <TextInput
                placeholder="Chiều cao"
                style={styles.input}
                value={height}
              ></TextInput>
            </View>

            <View style={styles.bodyComponent}>
              <Text style={styles.txtBody}>Cân nặng (kg)</Text>
              <TextInput
                placeholder="Cân nặng"
                style={styles.input}
                value={height}
              ></TextInput>
            </View>
          </View>
           <BtnAddComponent
           title = {STRING.save}
           onPress = {onSave}/>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    width:'100%'
  },
  txtHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
   
  },
  viewTxtHeader:{
    alignItems:'center',
    width:'90%'
  },
  iconHeader: { marginLeft: 5, width: '5%'},
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  body: {
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
  },
  bodyComponent: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  txtBody: {
    fontWeight: "bold",
  },
  btnSave:{
    width:'80%',
    backgroundColor: COLORS.btnSave,
    padding: 10,
    borderRadius: 10,
    alignItems:'center',
    marginBottom:10
  },
  txtSave: {
    fontWeight: "bold",
    color:'white'
  },
  bottom:{
      flex:1,
      width:'100%',
      justifyContent:'flex-end',
      alignItems:'center'
  }
});

export default AddBMIComponent;
