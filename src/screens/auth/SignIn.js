import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from 'react-native-phone-number-input';
import {signin} from '../../store/actions/account';
import {getPatientById, updateToken} from '../../store/actions/patient';
import LoadingComponent from '../../components/common/LoadingComponent';
import {styles} from '../../theme/basic';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {Icon} from 'react-native-elements';
const SignInScreen = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  function checkLogin() {
    let username = phone;
    let pass = password;
    setIsLoading(true);
    signin(username, pass).then(data => {
      if (data.count == 1) {
        sendOTP(data.account.id);
      } else {
        setIsLoading(false);
        Alert.alert('Thông báo', 'Đăng nhập không thành công!', [
          {
            text: 'OK',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ]);
      }
    });
  }

  const signinHandle = () => {
    auth
      .signInWithPhoneNumber(phone)
      .then(() => {
        console.log('login success!');
      })
      .catch(err =>
        Alert.alert('Đăng nhập lỗi!', 'Số điện thoại không hợp lệ! '),
      );
  };

  const setPasswordInput = text => {
    setPassword(text);
  };

  const setPhoneNumber = phoneInput => {
    setPhone(phoneInput);
  };

  const sendOTP = id => {
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
        updateToken(id, token)
          .then(() =>
            getPatientById(id).then(result => {
              props.navigation.navigate('Dashboard');
              setIsLoading(false);
            }),
          )
          .catch(() => null);
      });
  };

  const loginHandle = (userName, password) => {
    if (userName.length == 0 || password.length == 0) {
      Alert.alert(
        'Lỗi đầu vào!',
        'Số điện thoại hoặc password không được để trống.',
        [{text: 'OK'}],
      );
      return;
    }
    checkLogin();
  };

  return (
    <View style={styles.container}>
      <LoadingComponent visible={isLoading} message="Login..." />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>my-doctor!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: 'white',
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: '#009387',
            },
          ]}>
          Số điện thoại
        </Text>
        <View style={styles.action}>
          <PhoneInput
            style={[
              styles.textInput,
              {
                color: '#009387',
              },
            ]}
            international
            countryCallingCodeEditable={false}
            defaultCode="VN"
            value={phone}
            onChangeFormattedText={phoneInput => {
              setPhoneNumber(phoneInput);
            }}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: '#009387',
              marginTop: 35,
            },
          ]}>
          Mật khẩu
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#009387" size={20} />
          <TextInput
            placeholder="Mật khẩu của bạn..."
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: '#009387',
              },
            ]}
            secureTextEntry={secure}
            autoCapitalize="none"
            onChangeText={text => setPasswordInput(text)}
          />
          <Icon
            name={secure ? 'eye-with-line' : 'eye'}
            type="entypo"
            color="#009387"
            onPress={() => setSecure(!secure)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ForgotPass');
          }}>
          <Text style={{color: '#009387', marginTop: 15}}>
            Bạn quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
                backgroundColor: '#009387',
              },
            ]}
            onPress={() => {
              loginHandle(phone, password);
            }}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('SignUp')}
            style={[
              styles.signIn,
              {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#009387',
                },
              ]}>
              Đăng kí
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
