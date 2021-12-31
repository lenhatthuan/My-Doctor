import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  AsyncStorage,
  Alert
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getListDoctorService } from "../../store/actions/doctor";
import { CheckBox, SearchBar, Input, Icon } from "react-native-elements";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from'../../../assets/colors'
import { createMessage } from "../../store/actions/message";

const AlertDoctorSend = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [listSearchDoctor, setListSearchDoctor] = useState([]);
  const [listCheck, setListCheck] = useState([]);
  const [message, setMessage] = useState("");
  const [txtBtnSend, setTxtBtnSend] = useState("Gửi");

  useEffect(() => {
    setModalVisible(props.visible);
  });

  useEffect(() => {
  //  setDoctors(props.doctors);
  getListDoctor();  
  },[]);

  const sendToDoctor = () => {
    if(listCheck.length == 0) {
      Alert.alert("Bạn chưa chọn bác sĩ!", "OK");
    } else {
      AsyncStorage.getItem("id").then((id) => {
        setTxtBtnSend("Đang gửi ......");
        let content = "Tin nhắn: " +  message + props.content; 
        listCheck.forEach(doctorId => {
          let messages = {
            senderId: id,
            recieverId: doctorId,
            content: content
          };
  
          createMessage(messages).then (res => {
            setTxtBtnSend("Gửi");
            setModalVisible(false);
            cancelGoalHandler();
            props.onSend();
            Alert.alert("Thông báo", "Đã gửi thông tin đến bác sĩ!");
          })
        })
        
      });
    }
  }  

  const listItemCheck = (id) => {
      if (listCheck.length > 0) {
        let list = listCheck;
        const isCheck = list.includes(id);
        return isCheck;
      } else return false;
  }

  const handleCheckbox = (id) => {
    const ids = [...listCheck, id];
      if(listItemCheck(id)) {
        setListCheck(listCheck.filter(item => item !== id));
      } else {setListCheck(ids)}
  }

  const getListDoctor = () => {
    AsyncStorage.getItem("id").then((id) => {
      getListDoctorService(id, "CONFIRMED").then((res) => {
        setDoctors(res);
        setListSearchDoctor(res);
      });
    });
  };

  const onHandlePress = () => {
    props.onPress();
  };

  const findDoctorByName = async(text) =>{
    if(doctors) {
      let listDoctor = [];
      listDoctor = await doctors.filter(doctor => doctor.fullname.includes(text));
      if(Object.keys(listDoctor).length > 0) {
        setListSearchDoctor(listDoctor);
      }else setListSearchDoctor("");
    } else setDoctors(doctors);
  }


  const renderDoctor = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://myteledoc.app/wp-content/uploads/2021/04/teledoc-illustration.jpg",
            }}
            style={{ width: 60, height: 60 }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{item.fullname}</Text>
            <Text>Chuyên khoa {item.department}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <CheckBox checkedIcon="dot-circle-o" uncheckedIcon="circle-o"  checked = {listItemCheck(item.id)} onPress = {() => {
              handleCheckbox(item.id);
          }}/>
        </View>
      </View>
    );
  };

  const cancelGoalHandler = () => {
    props.onCancel();
  };

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      animationType="fade"
      onRequestClose={() => {
        Alert.alert("Bạn có chắc thoát.");
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={styles.view}
        onPress={() => {
          cancelGoalHandler();
        }}
      >
          
        <Pressable style={styles.errorComponent}>
          <View
            style={{
              backgroundColor: "#aaa",
              height: 5,
              width: 50,
              borderRadius: 10,
              margin: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              borderRadius: 8,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 10,
              marginTop: 15,
            }}
          >
            <SearchBar
              round
              inputContainerStyle={{ backgroundColor: "white" }}
              leftIconContainerStyle={{ backgroundColor: "white" }}
              inputStyle={{ backgroundColor: "white" }}
              containerStyle={{
                backgroundColor: "white",
                justifyContent: "space-around",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRadius: 8,
                marginLeft: 5,
                marginRight: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
                height: 50,
              }}
              searchIcon={{ size: 24 }}
              style={styles.searchBar}
              placeholder="Tên bác sĩ"
              onClear={(text) => {
                setName('Tên bác sĩ...');
                // findDoctorByName(text).then((result) => setData(result));
                findDoctorByName("");
              }}
              onChangeText={(text) => {
                 setName(text);
                // findDoctorByName(text).then((result) => setData(result));
                findDoctorByName(text);
              }}
              value={name}
            />
          </View>
         

          {listSearchDoctor.length == 0 ? (<View style = {{flex: 1, justifyContent:'center', alignItems:'center'}}><Text style = {{color:'#aaa'}}>Hiện bạn chưa đăng ký bác sĩ nào.</Text></View>):(<FlatList
            data={listSearchDoctor}
            renderItem={renderDoctor}
            style={{ width: "100%" }}
          />)}
          <View style = {{width: '100%', paddingLeft: 10, paddingRight: 10,  flexDirection:'column'}}>
         
      <View style = {{width: '100%', paddingLeft: 10, paddingRight: 10}}>
      <Input
      style = {{fontSize: 14}}
        placeholder="Nhập tin nhắn muốn gửi..."
        leftIcon={ <MaterialCommunityIcons name="message-processing-outline" size={16} color="#aaa" />}
        onChangeText={value => {setMessage(value)}}
        />
      </View>
       <View style = {{justifyContent:'center', alignItems:'center', width:'100%', marginTop: 5}}>
       <Pressable style = {styles.btnSave}
        onPress={() => {
          sendToDoctor();
        }}
       >
            <Text style = {styles.txtSave}>{txtBtnSend}</Text>
        </Pressable>
       </View>
          </View>
         
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
    btnSave:{
        width:'95%',
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
  errorComponent: {
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  searchBar: {
    borderRadius: 8,
    paddingLeft: 10,
    width: "100%",
    fontSize: 15
  },
});

export default AlertDoctorSend;
