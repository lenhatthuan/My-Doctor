import React, { useState } from "react";
import { View, Text } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { EMOTION } from "../../../constant";
import EmotionDialogComponent from "./EmotionDialogComponent";
import { styles } from "../../../theme/healthy";

export default function EmotionComponent({ item, remove }) {
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={[
        styles.item,
        {
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: item.emotion.background,
        },
      ]}
    >
      <Icon
        type="material-community"
        name={"emoticon-" + item.emotion.icon}
        color={item.emotion.color}
        size={30}
      />
      <View style={{ flex: 0.9 }}>
        <Text style={{ fontWeight: "bold" }}>{item.time}</Text>
        <Text>{item.content}</Text>
      </View>
      <Icon name="edit" color="blue" onPress={() => setVisible(true)} />
      <Icon name="delete" color="red" onPress={remove} />
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <EmotionDialogComponent
          id={item.id}
          action="edit"
          initContent={item.content}
          initEmotion={item.emotion}
          close={() => setVisible(false)}
        />
      </Overlay>
    </View>
  );
}
