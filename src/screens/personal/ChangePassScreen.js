import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  Alert,
  AsyncStorage,
} from "react-native";
import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { styles } from "../../theme/basic";
import LoadingComponent from "../../components/common/LoadingComponent";
import { changePass } from "../../store/actions/account";

export default function ChangePassScreen(props) {
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [captcha, setCaptcha] = useState();
  const [code, setCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [secure, setSecure] = useState([true, true, true]);

  const onSecure = (index) => (
    <Icon
      name={secure[index] ? "eye-with-line" : "eye"}
      type="entypo"
      color="#009387"
      onPress={() => {
        let array = [...secure];
        array[index] = !secure[index];
        setSecure(array);
      }}
    />
  );
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
      setIsLoading(true);
      AsyncStorage.getItem("accountData").then((res) => {
        const account = JSON.parse(res);
        changePass(account.accountId, account.username, oldPass, newPass)
          .then((result) => {
            setIsLoading(false);
            Alert.alert("Thông báo", "Đổi mật khẩu thành công", [
              {
                text: "OK",
                onPress: () => props.navigation.goBack(),
              },
            ]);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Thông báo", "Mật khẩu không đúng");
            clear();
          });
      });
    } else {
      Alert.alert("Thông báo", "Mật khẩu mới hoặc mã xác nhận không đúng");
      clear();
    }
  };

  const clear = () => {
    setOldPass();
    setNewPass();
    setConfirmPass();
    setCode();
    randomCaptcha();
  };

  return (
    <View style={styles.container}>
      <LoadingComponent visible={isLoading} message="Cập nhật..." />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon
        name="arrow-back"
        color="#009387"
        raised
        onPress={() => props.navigation.goBack()}
      />
      <View style={[styles.header, { marginVertical: -30 }]}>
        <Text style={styles.text_header}>Đổi mật khẩu!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: "white",
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
            },
          ]}
        >
          Mật khẩu hiện tại
        </Text>
        <View style={styles.action}>
          <TextInput
            value={oldPass}
            placeholder="Your present password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            secureTextEntry={secure[0]}
            onChangeText={(text) => setOldPass(text)}
          />
          {onSecure(0)}
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 20,
            },
          ]}
        >
          Mật khẩu mới
        </Text>
        <View style={styles.action}>
          <TextInput
            value={newPass}
            placeholder="Your new password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            secureTextEntry={secure[1]}
            onChangeText={(text) => setNewPass(text)}
          />
          {onSecure(1)}
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 20,
            },
          ]}
        >
          Nhập lại mật khẩu mới
        </Text>
        <View style={styles.action}>
          <TextInput
            value={confirmPass}
            placeholder="Confirm new password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={(text) => setConfirmPass(text)}
            secureTextEntry={secure[2]}
          />
          {onSecure(2)}
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 20,
            },
          ]}
        >
          Mã xác thực
        </Text>
        <View style={styles.action}>
          <TextInput
            value={code}
            placeholder="Captcha"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={(text) => setCode(text)}
          />
          <View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
            <Icon color="#009387" name="refresh" onPress={randomCaptcha} />
            <ImageBackground
              source={require("../../../assets/imgs/captcha.png")}
              style={styles.captcha_background}
            >
              <Text style={styles.captcha}>{captcha}</Text>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            disabled={!(newPass && confirmPass && oldPass && code)}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                backgroundColor: "#009387",
                marginTop: -20,
              },
            ]}
            onPress={showMessage}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
