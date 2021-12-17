import * as React from "react";
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
import { FIREBASE_CONFIG } from "../../environment/enviroment";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "../theme/nonLogin";
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
  const data = props.route.params.data;
  const action = props.route.params.action;

  const showMessage = (id = null) => {
    Alert.alert("Xác thực thành công", "", [
      {
        text: "OK",
        onPress: () => {
          props.navigation.popToTop();
          if (id === null) {
            props.navigation.navigate("Signin");
          } else {
            getPatientById(id).then((result) => {
              props.navigation.navigate("Profile");
            });
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
          signup(data).then((result) => {
            showMessage(result.account.id);
          });
          break;
        case "forgot-pass":
          forgotpass(data).then((result) => {
            showMessage();
          });
          break;
        default:
          break;
      }
    } catch (err) {
      Alert.alert("Xác thực không thành công");
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
      console.error(err);
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
        useNativeDriver={false}
        style={[
          styles.footer,
          {
            backgroundColor: "white",
          },
        ]}
      >
        <OTPInputView
          style={{ height: 100 }}
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
                marginTop: 15,
                backgroundColor: "#009387",
              },
            ]}
            onPress={authOTP}
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
