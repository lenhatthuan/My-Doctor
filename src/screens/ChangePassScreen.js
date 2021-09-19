import React, { Component, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
} from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../theme/style";

export default function ChangePass(props) {
  const [oldPass, setOldPass] = React.useState();
  const [newPass, setNewPass] = React.useState();
  const [confirmPass, setConfirmPass] = React.useState();
  const [captcha, setCaptcha] = React.useState();
  const [code, setCode] = React.useState();

  useEffect(() => {
    randomCaptcha();
  }, []);

  const randomCaptcha = () => {
    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    setCaptcha(result);
  };
  const showMessage = () => {
    // if (
    //   newPass === confirmPass &&
    //   code === captcha
    // ) {
    //   fetch("https://still-wave-21655.herokuapp.com/accounts/changepass/", {
    //     method: "PUT",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       //id :
    //       password: this.state.oldPass,
    //     }),
    //   })
    //     .then((result) => {
    //       Alert.alert("Đổi mật khẩu thành công");
    //     })
    //     .catch((err) => {
    //       Alert.alert("Đổi mật khẩu không thành công");
    //     });
    // } else {
    //   Alert.alert("Đổi mật khẩu không thành công");
    // }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      <Text style={styles.label}>Mật khẩu hiện tại</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setOldPass(text)}
        value={oldPass}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNewPass(text)}
        value={newPass}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPass(text)}
        value={confirmPass}
        secureTextEntry={true}
      />
      <Text style={styles.label}>Mã xác thực</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCode(text)}
        value={code}
      />
      <ImageBackground
        source={require("../../assets/imgs/captcha.png")}
        style={styles.captcha_background}
      >
        <Text style={styles.captcha}>{captcha}</Text>
      </ImageBackground>
      <Icon name="refresh" onPress={randomCaptcha} />
      <Button
        disabled={!(newPass && confirmPass && oldPass)}
        title="Đổi mật khẩu"
        onPress={showMessage}
      />
    </SafeAreaView>
  );
}
