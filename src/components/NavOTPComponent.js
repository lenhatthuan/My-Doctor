import * as React from "react";
import { Text, SafeAreaView, TextInput, Button, Alert } from "react-native";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { styles } from "../theme/style";

export default function NavOTPSreen({ check, name }) {
  const [phone, setPhone] = React.useState();
  const [password, setPass] = React.useState();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.label}>Số điện thoại</Text>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCode="VN"
        value={phone}
        onChangeFormattedText={(text) => setPhone(text)}
      />
      <Text style={styles.label}>Mật khẩu</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPass(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button
        disabled={!(isValidNumber(phone) && password)}
        title={name}
        onPress={() => {
          check({ phone, password });
        }}
      />
    </SafeAreaView>
  );
}
