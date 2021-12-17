import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { styles } from "../theme/nonLogin";
import LoadingComponent from "./common/LoadingComponent";

export default function NavOTPSreen({ check, name, back }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <LoadingComponent visible={isLoading} message={name + "..."} />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>{name}!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        useNativeDriver={false}
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
          Số điện thoại
        </Text>
        <View style={styles.action}>
          <PhoneInput
            style={[
              styles.textInput,
              {
                color: "#009387",
              },
            ]}
            international
            countryCallingCodeEditable={false}
            defaultCode="VN"
            value={phone}
            onChangeFormattedText={(text) => setPhone(text)}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 35,
            },
          ]}
        >
          Mật khẩu {name === "Quên mật khẩu" && "mới"}
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#009387" size={20} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: "#009387",
              },
            ]}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            disabled={!(isValidNumber(phone) && password)}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
                backgroundColor: "#009387",
              },
            ]}
            onPress={async () => {
              setIsLoading(true);
              await check({ phone, password });
              await setIsLoading(false);
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={back}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
