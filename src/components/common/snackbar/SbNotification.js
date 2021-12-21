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
      <View style={styles.view}>
        <Pressable style={styles.errorComponent}>
          <View style={{ width: "90%" }}>
            <View>
              <Text>{props.message}</Text>
            </View>
          </View>
          <Pressable onPress={() => onHandlePress()} style={{}}>
            <View>
              {" "}
              <Text>{props.action}</Text>
            </View>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errorComponent: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#003638",
  },
  view: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
});

export default SbNotification;
