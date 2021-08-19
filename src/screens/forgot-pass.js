import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";

export default class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.state = {
      title: "Quên mật khẩu",
      lbPhone: "Số điện thoại",
      lbPass: "Mật khẩu mới",
      phone: null,
      pass: null,
    };
  }
  static navigationOptions = {
    title: "ForgotPass",
  };
  showMessage() {
    fetch(
      `https://still-wave-21655.herokuapp.com/accounts/${this.state.phone}/username`
    )
      .then((response) => response.json())
      .then((result) => {
        if (
          isValidNumber(this.state.phone) &&
          this.state.pass != null &&
          result.count !== 0
        ) {
          Alert.alert("thành công", "", [
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
            " không thành công",
            "Số điện thoại /& mật khẩu không hợp lý",
            [{ text: "OK", onPress: () => console.log(this.state.phone) }]
          );
        }
        //console.log(result);
      })
      .catch((error) => console.error(error));

    /*if (isValidNumber(this.state.phone) && this.state.pass != null) {
      Alert.alert("thành công", "", [
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
        " không thành công",
        "Số điện thoại /& mật khẩu không hợp lý",
        [{ text: "OK", onPress: () => console.log(this.state.phone) }]
      );
    }*/
  }
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
        <Button title="Gửi mã OTP" onPress={this.showMessage} />
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
//
