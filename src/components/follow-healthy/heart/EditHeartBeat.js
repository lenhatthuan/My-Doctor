import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TextInput,
} from "react-native";

const EditHeartBeat = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [heartBeat, setHeartBeat] = useState(props.HeartBeat.heartBeat + "");
  const [diastole, setDiastole] = useState(props.HeartBeat.diastole + "");
  const [systole, setSystole] = useState(props.HeartBeat.systole + "");

  useEffect(() => {
    setModalVisible(props.visible);
  });

  const update = () => {
    props.update(diastole, systole, heartBeat);
  };

  const onHandlePress = () => {
    props.onCancel();
  };

  const onHandleDeletePress = () => {
    props.onDelete();
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
          <View
            style={{
              backgroundColor: "white",
              height: 450,
              width: "90%",
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../../assets/imgs/edit.gif")}
              style={{ width: 50, height: 50 }}
            />
            <View
              style={{ borderWidth: 1, width: "100%", borderColor: "#04293A" }}
            />
            <View
              style={{
                justifyContent: "center",
                // alignItems: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  //   alignItems: "center",
                }}
              >
                <Text style={styles.txt}>Chỉnh sửa chỉ số nhịp tim</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 15,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {props.message}
                </Text>
                <Text style={styles.txt}>Tâm thu</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setSystole(text);
                  }}
                  value={systole}
                  placeholder={systole}
                  keyboardType="numeric"
                />
                <Text style={styles.txt}>Tâm trương</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setDiastole(text);
                  }}
                  value={diastole}
                  placeholder={diastole}
                  keyboardType="numeric"
                />
              
                <Text style={styles.txt}>Nhịp tim</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setHeartBeat(text);
                  }}
                  value={heartBeat}
                  placeholder={heartBeat}
                  keyboardType="numeric"
                />
                <Text style={styles.txt}>
                  Ngày cập nhập: {props.HeartBeat.updatedAt}
                </Text>
              </View>
              <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Pressable
                  style={{
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    onHandlePress();
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      borderRadius: 5,
                      backgroundColor: "#FF5959",
                      alignItems: "center",
                      marginLeft: 5,
                      marginRight: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.36,
                      shadowRadius: 6.68,

                      elevation: 11,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Hủy
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    onHandleDeletePress();
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      borderRadius: 5,
                      backgroundColor: "#FFAB76",
                      alignItems: "center",
                      marginLeft: 5,
                      marginRight: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.36,
                      shadowRadius: 6.68,

                      elevation: 11,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Xóa
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  style={{
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    update();
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      borderRadius: 5,
                      backgroundColor: "#00AF91",
                      alignItems: "center",
                      marginLeft: 5,
                      marginRight: 5,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.36,
                      shadowRadius: 6.68,

                      elevation: 11,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      Chỉnh sửa
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  errorComponent: {
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    textAlign: "center",
  },
  txt: {
    fontWeight: "bold",
  },
});

export default EditHeartBeat;
