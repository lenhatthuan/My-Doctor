import * as React from "react";
import { View, SafeAreaView, Text, Button } from "react-native";
import OTPInputView from "react-native-otp-input";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { FIREBASE_CONFIG } from "../../environment/enviroment";
import { styles } from "../theme/style";

export default function OTPScreen({ authOTP, sendOTP }) {
  const recaptchaVerifier = React.useRef();
  const [verificationCode, setVerificationCode] = React.useState();

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
        <Button
          title="Xác thực"
          onPress={() => {
            authOTP(verificationCode);
          }}
        />
        <Button
          title="Gửi lại mã"
          onPress={() => {
            sendOTP();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
