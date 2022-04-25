import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  SafeAreaView,
} from 'react-native';
import OTPInputView from 'react-native-otp-input';
import auth from '@react-native-firebase/auth';
import {signup, forgotpass} from '../../store/actions/account';
import {styles} from '../../theme/basic';
import Loading from '../../components/common/Loading';
import Message from '../../components/common/Message';
import message from '../../config/message';

const OtpAuth = props => {
  const anim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOtp] = useState('');
  const [state, setState] = useState();

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);

  const params = props.route.params;

  const authen = async () => {
    setIsLoading(true);
    try {
      await state.confirm(otp);
      switch (params.action) {
        case 'signup':
          signup(params.data);
          break;
        case 'forgotPass':
          forgotpass(params.data);
          break;
        default:
          break;
      }
      setType(message.success);
      setContent('Xác thực thành công');
    } catch (error) {
      setType(message.error);
      setContent('Xác thực không thành công');
    } finally {
      setIsLoading(false);
      setVisible(true);
    }
  };

  const send = async () =>
    setState(await auth().signInWithPhoneNumber(params.data.phone));

  useEffect(() => {
    send();
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Loading visible={isLoading} message={'Xác thực ...'} />
      <Message
        visible={visible}
        content={content}
        type={type}
        press={() => {
          setVisible(false);
          if (type === message.success) props.navigation.popToTop();
        }}
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Xác thực bằng mã OTP</Text>
      </View>
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}>
        <OTPInputView
          style={{height: 150}}
          pinCount={6}
          code={otp}
          onCodeFilled={text => setOtp(text)}
        />
        <View style={styles.button}>
          <TouchableOpacity
            disabled={!otp}
            style={[styles.signIn, {backgroundColor: '#009387'}]}
            onPress={authen}>
            <Text style={styles.textSign}>Xác thực</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={send}
            style={[styles.signIn, {marginTop: 15}]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>
              Gửi lại mã
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
export default OtpAuth;
