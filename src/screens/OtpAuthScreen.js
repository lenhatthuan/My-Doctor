import React, { Component } from "react";
import { View, StyleSheet, Text, Button, Alert, Pressable } from "react-native";
import OTPInputView from "react-native-otp-input";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { getPatientById } from "../store/actions/patient";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDbVPwRqEBmpvFCbawWPH4O2aLQN88qdP4",
  authDomain: "my-doctor-3434e.firebaseapp.com",
  projectId: "my-doctor-3434e",
  storageBucket: "my-doctor-3434e.appspot.com",
  messagingSenderId: "801718489471",
  appId: "1:801718489471:web:9ac4d8d96c358f4860ca4a",
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  firebase.app();
}

export default class OTPAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Xác thực bằng mã OTP",
      code: "",
      id: "",
    };
    this.recaptchaVerifier = React.createRef(null);
  }
   otpSignin() {
     let id = this.props.navigation.getParam("patientId", "")
     getPatientById(id);
    Alert.alert("Xác thực thành công!", "", [{
      text: "OK",
      onPress: () =>{
        this.props.navigation.navigate("Home")
      }
    }])
  };
  static navigationOptions = {
    title: "OTPAuth",
  };

 
  async componentDidMount() {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        this.props.navigation.getParam("phone", ""),
        this.recaptchaVerifier.current
      );
      this.setState({ id: verificationId });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={this.recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
        <Text style={styles.title}>{this.state.title}</Text>
        <OTPInputView
          style={{ height: 100 }}
          pinCount={6}
          code={this.state.code}
          onCodeFilled={(code) => this.setState({ code })}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <View style={styles.label}>
          <Button
            title="Xác thực"
            disabled={!this.state.id}
            onPress={async () => {
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  this.state.id,
                  this.state.code
                );
                const authResult = await firebase
                  .auth()
                  .signInWithCredential(credential);
                  if(this.props.navigation.getParam("route", "") === "signin"){
                   this.otpSignin();
                  } else
                if (this.props.navigation.getParam("route", "") === "signup") {
                  fetch("https://still-wave-21655.herokuapp.com/accounts", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: this.props.navigation.getParam("phone", ""),
                      password: this.props.navigation.getParam("pass", ""),
                      role: "patient",
                    }),
                  }).then((result) => {
                    Alert.alert("Xác thực thành công", "", [
                      {
                        text: "OK",
                        onPress: () =>
                          this.props.navigation.navigate("Profile", {
                            id: result.json().id,
                          }),
                      },
                    ]);
                  });
                } else if (
                  this.props.navigation.getParam("route", "") === "forgot-pass"
                ) {
                  fetch(
                    "https://still-wave-21655.herokuapp.com/accounts/forgotpass/" +
                      this.props.navigation.getParam("phone", ""),
                    {
                      method: "PUT",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        password: this.props.navigation.getParam("pass", ""),
                      }),
                    }
                  ).then((result) => {
                    Alert.alert("Xác thực thành công", "", [
                      {
                        text: "OK",
                        onPress: () =>
                          this.props.navigation.navigate("Profile", {
                            id: result.json.id,
                          }),
                      },
                    ]);
                  });
                }
              } catch (err) {
                console.error(err);
              }
            }}
          />
          <Button
            title="Gửi lại mã"
            onPress={async () => {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              try {
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  this.props.navigation.getParam("phone", ""),
                  this.recaptchaVerifier.current
                );
                this.setState({ id: verificationId });
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    margin: 20,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
