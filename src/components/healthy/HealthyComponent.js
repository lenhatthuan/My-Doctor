import React from "react";
import { View, Text, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../../theme/healthy";

export default function HealthyComponent({
  onPress,
  title,
  icon,
  content,
  add,
  button,
}) {
  return (
    <Pressable style={styles.main} onPress={onPress}>
      <Text style={{ fontWeight: "bold" }}>{title}</Text>
      <View style={styles.body}>
        {icon}
        <Text style={{ flex: 0.9 }}>{content}</Text>
        <View>
          <Pressable style={styles.buttonBody} onPress={add}>
            <Text style={styles.txtBtnBody}>{button}</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
