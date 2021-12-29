import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import OTPInputView from "react-native-otp-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FIREBASE_CONFIG } from "../../../environment/enviroment";
import * as Animatable from "react-native-animatable";
import { styles } from "../../theme/basic";
import * as firebase from "firebase";
import { signup, forgotpass } from "../../store/actions/account";
import { getPatientById } from "../../store/actions/patient";

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  firebase.app();
}

export default function OTPAuthScreen(props) {
  const recaptchaVerifier = useRef();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState();
  const data = props.route.params.data;
  const action = props.route.params.action;

  const showMessage = (id = null) => {
    Alert.alert("Thông báo", "Xác thực thành công", [
      {
        text: "OK",
        onPress: () => {
          props.navigation.popToTop();
          if (!id) {
            getPatientById(id).then((result) =>
              props.navigation.navigate("Signin")
            );
          } else {
            props.navigation.navigate("ChangeProfile");
          }
        },
      },
    ]);
  };

  const authOTP = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      const authResult = await firebase.auth().signInWithCredential(credential);
      switch (action) {
        case "signup":
          signup(data).then((result) => showMessage(result.account.id));
          break;
        case "forgot-pass":
          forgotpass(data).then(() => showMessage());
          break;
        default:
          break;
      }
    } catch (err) {
      Alert.alert("Thông báo", "Xác thực không thành công");
    }
  };

  const sendOTP = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        data.phone,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    sendOTP();
  }, []);

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FIREBASE_CONFIG}
        //attemptInvisibleVerification={true}
      />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Xác thực bằng mã OTP!</Text>
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
        <OTPInputView
          style={{ height: 150 }}
          pinCount={6}
          code={verificationCode}
          onCodeFilled={(text) => setVerificationCode(text)}
        />

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                backgroundColor: "#009387",
              },
            ]}
            onPress={authOTP}
            disabled={!verificationCode}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Xác thực
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sendOTP}
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
              Gửi lại mã
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
