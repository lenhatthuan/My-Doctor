import React, { useState } from "react";
import { View, Text, AsyncStorageStatic } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import HeartBeatDialogComponent from "./HeartBeatDialogComponent";
import { getAge } from "../../../store/actions/patient";
import { styles } from "../../../theme/healthy";

export default function HeartBeatComponent({ item, remove }) {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState();
  const show = (text) => {
    setOption(text);
    setVisible(true);
  };

  return (
    <View style={styles.item}>
      <Text style={{ fontWeight: "bold" }}>{item.time}</Text>
      <Text>
        Huyết áp: {item.systole}/{item.diastole} mmHg
      </Text>
      <Text>Nhịp tim: {item.heartbeat} nhịp/phút</Text>
      <View style={{ flexDirection: "row-reverse" }}>
        <Icon name="send" color="blue" onPress={() => show("send")} />
        <Icon name="delete" color="red" onPress={remove} />
        <Icon name="edit" color="green" onPress={() => show("edit")} />
      </View>
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        {option === "edit" && (
          <HeartBeatDialogComponent
            id={item.id}
            initDiastole={item.diastole.toString()}
            initHeartBeat={item.heartbeat.toString()}
            initSystole={item.systole.toString()}
            close={() => setVisible(false)}
            action="edit"
          />
        )}
        {option === "send" && <HeartBeatDialogComponent />}
      </Overlay>
    </View>
  );
}
