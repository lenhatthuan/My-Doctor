import * as React from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../../theme/style";

export default function RequestLogin({ onPress }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={{ fontSize: 15 }}>Bạn chưa đăng nhập.</Text>
      <Button title="Đăng nhập" onPress={onPress} />
    </View>
  );
}
