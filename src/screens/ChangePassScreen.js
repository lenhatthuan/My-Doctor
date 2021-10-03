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
import { styles, image } from "../theme/style";
import { changePass } from "../store/actions/account";

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
    if (newPass === confirmPass && code === captcha) {
      changePass({ oldPass, newPass })
        .then((result) => {
          Alert.alert("Đổi mật khẩu thành công");
        })
        .catch((err) => {
          Alert.alert("Đổi mật khẩu không thành công");
        });
    } else {
      Alert.alert("Đổi mật khẩu không thành công");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: image.background,
        }}
        style={styles.container}
      >
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
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.input, { width: "45%" }]}
            onChangeText={(text) => setCode(text)}
            value={code}
          />
          <ImageBackground
            source={require("../../assets/imgs/captcha.png")}
            style={styles.captcha_background}
          >
            <Text style={styles.captcha}>{captcha}</Text>
          </ImageBackground>
          <Icon
            containerStyle={{ paddingVertical: 10 }}
            name="refresh"
            onPress={randomCaptcha}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={!(newPass && confirmPass && oldPass)}
            title="Đổi mật khẩu"
            onPress={showMessage}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
