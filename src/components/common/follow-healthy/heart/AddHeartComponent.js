import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../../../assets/colors"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BtnAddComponent from "../../BtnAddComponent";
import STRING from "../../../../utils/string";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createHeart } from "../../../../store/actions/heart";
const AddHeartComponent = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [diastole , setDiastole ] = useState(""); //tâm trương
  const [systole , setSystole ] = useState(""); // tâm thu
  const [heartBeat  , setHeartBeat ] = useState(""); 
  const [messageDiastole, setMessageDiastole] = useState("");
  const [messageSystole, setMessageSystole] = useState("");
  useEffect(() => {
    setModalVisible(props.visible);
  });

  const cancelGoalHandler = () => {
    props.onCancel();
  };

  const handleValueInputDiastole = (text) => {
      if(text > systole)
        setMessageDiastole("Chỉ số tâm trương phải nhỏ hơn tâm thu");
    else setMessageDiastole("");
    if(text > diastole)
        setMessageSystole("");
    else setMessageSystole("Chỉ số tâm thu phải lớn hơn tâm trương");
  }

  const handleValueInputSystole = (text) => {
    if(text < diastole)
        setMessageSystole("Chỉ số tâm thu phải lớn hơn tâm trương");
    else setMessageSystole("");
    if(text < systole)
    setMessageDiastole("");
    else  setMessageDiastole("Chỉ số tâm trương phải nhỏ hơn tâm thu");
}

  const onSave = () =>{
   if(modalVisible){
    AsyncStorage.getItem("patientData").then((res) => {
      const patient = JSON.parse(res);
      createHeart(patient.patientId, systole, diastole, heartBeat).then(heart =>{
        if(heart){   
          setDiastole("");
          setSystole("");
          setHeartBeat("");
          setModalVisible(false);
        }else{
          alert("Lỗi, không thêm được!");
        }
      })
    });
   }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          cancelGoalHandler();
        }}
      >
        <Pressable style={styles.modalView}
        
        onPress={() => {
        }}>
          <View style={styles.header}>
            <Pressable style={styles.iconHeader}
            onPress={() => {
              cancelGoalHandler();
            }}>
              <FontAwesome name="remove" size={24} color="black" />
            </Pressable>
            <View style = {styles.viewTxtHeader}>
              <Text style={styles.txtHeader}>Thêm dữ liệu</Text>
            </View>
          </View>

          
          <View style={styles.body}>

          <View style={styles.bodyComponent}>
              <Text style={styles.txtBody}>Huyết áp tâm thu (mmHg)</Text>
              <TextInput
               returnKeyType = "done"
                placeholder="Huyết áp tâm thu"
                keyboardType='numeric'
                style={styles.input}
                value={systole}
                onChangeText = {(text) =>{
                    handleValueInputSystole(text);
                    setSystole(text);
                }}
              ></TextInput>
              <Text style = {styles.txtMessage}> {messageSystole}</Text>
            </View>

            
            <View style={styles.bodyComponent}>
              <Text style={styles.txtBody}>Huyết áp tâm trương (mmHg)</Text>
              <TextInput
              returnKeyType = "done"
              keyboardType='numeric'
                placeholder="Huyết áp tâm trương "
                style={styles.input}
                value={diastole}
                onChangeText = {(text) =>{
                    handleValueInputDiastole(text);
                    setDiastole(text);
                }}
              ></TextInput>
                <Text style = {styles.txtMessage}> {messageDiastole}</Text>
            </View>

           

            <View style={styles.bodyComponent}>
              <Text style={styles.txtBody}>Nhịp tim (bpm - Nhịp/Phút)</Text>
              <TextInput
               returnKeyType = "done"
                placeholder="Nhịp tim"
                keyboardType='numeric'
                style={styles.input}
                value={heartBeat}
                onChangeText = {(text) =>{
                  setHeartBeat(text)
                }}
              ></TextInput>
            
            </View>
          </View>
           <BtnAddComponent
           title = {STRING.save}
           onPress = {onSave}/>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
    txtMessage: {
        fontWeight: '400',
        fontSize: 12,
        color: "#FF0000",
        marginBottom: 5
    }, 

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  modalView: {
    width: "100%",
    height: "65%",
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
    width:'100%'
  },
  txtHeader: {
    fontWeight: "bold",
    fontSize: 14,
   
  },
  viewTxtHeader:{
    alignItems:'center',
    flex:1,
    justifyContent:'center'
  },
  iconHeader: {
    paddingLeft: 10,
    alignItems:'center'
  },
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

export default AddHeartComponent;
