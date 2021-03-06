import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../../../theme/basic";
import { EMOTION } from "../../../constant";
import { add, edit } from "../../../store/actions/emotion";

export default function EmotionDialogComponent({
  id,
  initContent,
  initEmotion = EMOTION.GREAT,
  action = "add",
  close,
}) {
  const [content, setContent] = useState(initContent);
  const [emotion, setEmotion] = useState(initEmotion);

  const icon = (emotion) => (
    <View style={{ alignItems: "center", margin: 6 }}>
      <Icon
        type="material-community"
        name={"emoticon-" + emotion.icon}
        color={emotion.color}
        onPress={() => setEmotion(emotion)}
        size={30}
      />
      <Text>{emotion.text}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: emotion.background, padding: 10 }}>
      <Text style={{ fontWeight: "bold" }}>{emotion.title}</Text>
      <TextInput
        placeholder={emotion.content}
        value={content}
        onChangeText={(text) => setContent(text)}
        multiline={true}
        style={{
          height: 100,
          backgroundColor: "white",
          borderColor: emotion.color,
          borderWidth: 3,
          borderRadius: 8,
          padding: 10,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {icon(EMOTION.GREAT)}
        {icon(EMOTION.FUN)}
        {icon(EMOTION.NORMAL)}
        {icon(EMOTION.SAD)}
        {icon(EMOTION.ANDRY)}
      </View>
      <TouchableOpacity
        style={[
          styles.signIn,
          {
            marginTop: 15,
            borderColor: emotion.color,
            borderWidth: 3,
            backgroundColor: "white",
          },
        ]}
        disabled={!content}
        onPress={() => {
          if (action === "add") {
            AsyncStorage.getItem("accountData").then((res) => {
              const account = JSON.parse(res);
              add(account.accountId, emotion.text, content)
                .then((res) => close())
                .catch((err) => console.log(err));
            });
          } else if (action === "edit") {
            edit(id, emotion.text, content)
              .then((res) => close())
              .catch((err) => console.log(err));
          }
        }}
      >
        <Text style={styles.textSign}>L??u</Text>
      </TouchableOpacity>
    </View>
  );
}
