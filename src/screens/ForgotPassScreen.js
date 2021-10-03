import * as React from "react";
import { Alert } from "react-native";
import NavOTP from "../components/NavOTPComponent";
import { isAccount } from "../store/actions/account";

export default function ForgotPass(props) {
  const check = (data) => {
    isAccount(data.phone)
      .then((result) => {
        result !== 0
          ? Alert.alert(" thành công", "", [
              {
                text: "OK",
                onPress: () =>
                  props.navigation.navigate("OTPAuth", {
                    data: data,
                    action: "forgot-pass",
                  }),
              },
            ])
          : Alert.alert(" không thành công");
      })
      .catch((err) => console.error(err));
  };
  return <NavOTP check={check} name="Quên mật khẩu" />;
}
