import * as React from "react";
import { View, SafeAreaView, Text, Button, Alert } from "react-native";
import OTPInputView from "react-native-otp-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FIREBASE_CONFIG } from "../../environment/enviroment";
import { styles } from "../theme/style";
import * as firebase from "firebase";
import { signup, forgotpass } from "../store/actions/account";
import { getPatientById } from "../store/actions/patient";

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  firebase.app();
}

export default function OTPAuth(props) {
  const recaptchaVerifier = React.useRef();
  const [verificationCode, setVerificationCode] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const data = props.navigation.getParam("data", "");
  const action = props.navigation.getParam("action", "");

  const showMessage = (id, screen) => {
    Alert.alert("Xác thực thành công", "", [
      {
        text: "OK",
        onPress: () =>
          getPatientById(id).then((result) => {
            props.navigation.navigate(screen);
          }),
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
          signup(data).then((result) => {
            showMessage(result, "Profile");
          });
          break;
        case "forgot-pass":
          forgotpass(data).then((result) => {
            showMessage(result, "Home");
          });
          break;
        default:
          break;
      }
    } catch (err) {
      //Alert.alert("Xác thực không thành công");
      console.error(err);
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
    console.log(action === "forgot-pass");
    sendOTP();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FIREBASE_CONFIG}
        //attemptInvisibleVerification={true}
      />
      <Text style={styles.title}>Xác thực bằng mã OTP</Text>
      <OTPInputView
        style={{ height: 100 }}
        pinCount={6}
        code={verificationCode}
        onCodeFilled={(text) => setVerificationCode(text)}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <View style={styles.space}>
        <Button title="Xác thực" onPress={authOTP} />
        <Button title="Gửi lại mã" onPress={sendOTP} />
      </View>
    </SafeAreaView>
  );
}
