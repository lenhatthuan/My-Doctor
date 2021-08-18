import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.state = {
      title: "Đăng ký bằng số điện thoại",
      lbPhone: "Số điện thoại",
      lbPass: "Mật khẩu",
      phone: null,
      pass: null,
    };
  }
  showMessage() {
    if (isValidNumber(this.state.phone) && this.state.pass != null) {
      Alert.alert("Ðăng ký thành công", "", [
        {
          text: "OK",
          onPress: () =>
            this.props.navigation.navigate("OTPAuth", {
              phone: this.state.phone,
            }),
        },
      ]);
    } else {
      Alert.alert(
        "Ðăng ký không thành công",
        "Số điện thoại /& mật khẩu không hợp lý",
        [{ text: "OK", onPress: () => console.log(this.state.phone) }]
      );
    }
  }
  static navigationOptions = {
    title: "Signup",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.label}>{this.state.lbPhone}</Text>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCode="VN"
          value={this.state.phone}
          onChangeFormattedText={(phone) => this.setState({ phone })}
        />
        <Text style={styles.label}>{this.state.lbPass}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(pass) => this.setState({ pass })}
          value={this.state.pass}
          secureTextEntry={true}
        />
        <Button title="Đăng ký" onPress={this.showMessage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    fontSize: 15,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});