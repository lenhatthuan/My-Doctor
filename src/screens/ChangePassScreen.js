import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
} from "react-native";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

export default class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.showMessage = this.showMessage.bind(this);
    this.randomCaptcha = this.randomCaptcha.bind(this);

    this.state = {
      title: "Đổi mật khẩu",
      lbOldPass: "Mật khẩu hiện tại",
      lbNewPass: "Mật khẩu mới",
      lbConfirm: "Nhập lại mật khẩu mới",
      lbCaptcha: "Mã xác thực",
      captcha: null,
      oldPass: null,
      newPass: null,
      confirmPass: null,
      captcha: null,
      code: null,
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Captcha: require("../../assets/captcha.ttf"),
    });
    this.randomCaptcha();
  }
  randomCaptcha() {
    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    this.setState({ captcha: result });
  }
  showMessage() {
    if (
      this.state.newPass === this.state.confirmPass &&
      this.state.code === this.state.captcha
    ) {
      fetch("https://still-wave-21655.herokuapp.com/accounts/changepass/", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id : 
          password: this.state.oldPass
        }),
      })
        .then((result) => {
          Alert.alert("Đổi mật khẩu thành công");
        })
        .catch((err) => {
          Alert.alert("Đổi mật khẩu không thành công");
        });
    } else {
      Alert.alert("Đổi mật khẩu không thành công");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.label}>{this.state.lbOldPass}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(oldPass) => this.setState({ oldPass })}
          value={this.state.oldPass}
          secureTextEntry={true}
        />
        <Text style={styles.label}>{this.state.lbNewPass}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(newPass) => this.setState({ newPass })}
          value={this.state.newPass}
          secureTextEntry={true}
        />
        <Text style={styles.label}>{this.state.lbConfirm}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(confirmPass) => this.setState({ confirmPass })}
          value={this.state.confirmPass}
          secureTextEntry={true}
        />
        <Text style={styles.label}>{this.state.lbCaptcha}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(code) => this.setState({ code })}
          value={this.state.code}
        />
        <ImageBackground
          source={require("../../assets/imgs/captcha.png")}
          style={{ width: 180, alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "Captcha",
              fontSize: 30,
              letterSpacing: -5,
            }}
          >
            {this.state.captcha}
          </Text>
        </ImageBackground>
        <FontAwesome.Button
          iconStyle={{ marginRight: 0 }}
          backgroundColor="white"
          color="limegreen"
          name="refresh"
          onPress={this.randomCaptcha}
          borderRadius={100}
        />
        <Button
          disabled={
            !(
              this.state.newPass &&
              this.state.confirmPass &&
              this.state.oldPass
            )
          }
          title="Cập nhật"
          onPress={this.showMessage}
        />
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
