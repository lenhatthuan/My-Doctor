import React from "react";
import { useState, useEffect } from "react";
import { Modal, View, StyleSheet, Pressable, Image, Text } from "react-native";

const SbNotification = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(props.visible);
  });

  const onHandlePress = () => {
    props.onPress();
  };

  setTimeout(() => {
    setModalVisible(false);
    props.onPress();
}, 10000)


  return (
    <Modal
      transparent={true}
      visible={props.visible}
      animationType="fade"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.view}>
        <Pressable style={styles.errorComponent}>

              <Text style = {{fontWeight:'bold', color:'white', marginLeft: 20, marginRight: 20}}>{props.message}</Text>
       
            <Pressable onPress={() => onHandlePress()} style={{marginRight: 20, marginLeft:20}}>

              <Text style = {{color: '#FF9300', fontSize: 20, fontWeight:'bold'}}>{props.action}</Text>

          </Pressable>
          
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errorComponent: {
    justifyContent: 'space-between',
    alignItems: "center",
    // backgroundColor: "#003638",
    backgroundColor: "rgba(0, 54, 56, 0.95)",
    height: 55,
    width: '95%',
    borderRadius: 3,
    flexDirection:'row',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 9,
},
shadowOpacity: 0.50,
shadowRadius: 12.35,

elevation: 19,
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    paddingBottom: 50,
    alignItems:'center'
    // backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
});

export default SbNotification;
