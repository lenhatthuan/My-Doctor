import * as React from "react";
import { Alert } from "react-native";
import NavOTP from "../../components/NavOTPComponent";
import { isAccount } from "../../store/actions/account";

export default function ForgotPassScreen(props) {
  const check = (data) => {
    isAccount(data.phone)
      .then((result) => {
        result !== 0
          ? props.navigation.navigate("OTPAuth", {
              data: data,
              action: "forgot-pass",
            })
          : Alert.alert("Không tồn tại tài khoản này");
      })
      .catch((err) => console.error(err));
  };
  return (
    <NavOTP
      check={check}
      name="Quên mật khẩu"
      back={() => props.navigation.goBack()}
    />
  );
}
