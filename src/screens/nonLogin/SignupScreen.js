import * as React from "react";
import { Alert } from "react-native";
import NavOTP from "../../components/NavOTPComponent";
import { isAccount } from "../../store/actions/account";

export default function SignupScreen(props) {
  const check = (data) => {
    isAccount(data.phone)
      .then((result) => {
        result === 0
          ? props.navigation.navigate("OTPAuth", {
              data: data,
              action: "signup",
            })
          : Alert.alert("Thông báo", "Tài khoản đã được đăng ký");
      })
      .catch((err) => console.error(err));
  };
  return (
    <NavOTP
      check={check}
      name="Đăng ký"
      back={() => props.navigation.goBack()}
    />
  );
}
