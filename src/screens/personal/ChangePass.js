import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  Animated,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from '../../theme/basic';
import Loading from '../../components/common/Loading';
import Message from '../../components/common/Message';
import message from '../../config/message';

const ChangePass = props => {
  const anim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);

  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [captcha, setCaptcha] = useState();
  const [code, setCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [secure, setSecure] = useState([true, true, true]);

  const onSecure = index => (
    <Icon
      name={secure[index] ? 'eye-with-line' : 'eye'}
      type="entypo"
      color="#009387"
      onPress={() => {
        let array = [...secure];
        array[index] = !secure[index];
        setSecure(array);
      }}
    />
  );

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    randomCaptcha();
  }, []);

  const randomCaptcha = () => {
    const randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    setCaptcha(result);
  };

  const showMessage = () => {
    if (newPass === confirmPass && code === captcha) {
      setIsLoading(true);
      //   AsyncStorage.getItem('accountData').then(res => {
      //     const account = JSON.parse(res);
      //     changePass(account.accountId, account.username, oldPass, newPass)
      //       .then(result => {
      //         setIsLoading(false);
      //         Alert.alert('Thông báo', 'Đổi mật khẩu thành công', [
      //           {
      //             text: 'OK',
      //             onPress: () => props.navigation.goBack(),
      //           },
      //         ]);
      //       })
      //       .catch(err => {
      //         setIsLoading(false);
      //         Alert.alert('Thông báo', 'Mật khẩu không đúng');
      //         clear();
      //       });
      //   });
      // } else {
      //   Alert.alert('Thông báo', 'Mật khẩu mới hoặc mã xác nhận không đúng');
      //   clear();
    } else {
      setVisible(true);
      setType(message.warning);
      setContent('Mật khẩu hoặc mã xác nhận không trùng khớp');
    }
  };

  const clear = () => {
    setOldPass();
    setNewPass();
    setConfirmPass();
    setCode();
    randomCaptcha();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loading visible={isLoading} message="Cập nhật..." />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Message
        visible={visible}
        content={content}
        type={type}
        press={() => {
          setVisible(false);
          if (type === message.success) props.navigation.pop();
        }}
      />
      <View style={[styles.header, {marginVertical: -20}]}>
        <Text style={styles.text_header}>Đổi mật khẩu</Text>
      </View>
      <Animated.View
        style={[
          styles.footer,
          {
            flex: 5,
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
        <Text style={styles.text_footer}>Mật khẩu hiện tại</Text>
        <View style={styles.action}>
          <TextInput
            value={oldPass}
            placeholder="Your present password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            secureTextEntry={secure[0]}
            onChangeText={text => setOldPass(text)}
          />
          {onSecure(0)}
        </View>
        <Text style={[styles.text_footer, {marginTop: 10}]}>Mật khẩu mới</Text>
        <View style={styles.action}>
          <TextInput
            value={newPass}
            placeholder="Your new password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            secureTextEntry={secure[1]}
            onChangeText={text => setNewPass(text)}
          />
          {onSecure(1)}
        </View>
        <Text style={[styles.text_footer, {marginTop: 10}]}>
          Nhập lại mật khẩu mới
        </Text>
        <View style={styles.action}>
          <TextInput
            value={confirmPass}
            placeholder="Confirm new password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={text => setConfirmPass(text)}
            secureTextEntry={secure[2]}
          />
          {onSecure(2)}
        </View>

        <Text style={[styles.text_footer, {marginTop: 10}]}>Mã xác thực</Text>
        <View style={styles.action}>
          <TextInput
            value={code}
            placeholder="Captcha"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={text => setCode(text)}
          />
          <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
            <Icon color="#009387" name="refresh" onPress={randomCaptcha} />
            <ImageBackground
              source={require('../../assets/captcha.png')}
              style={styles.captcha_background}>
              <Text style={styles.captcha}>{captcha}</Text>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            disabled={!(newPass && confirmPass && oldPass && code)}
            style={[
              styles.signIn,
              {backgroundColor: '#009387', marginTop: -20},
            ]}
            onPress={showMessage}>
            <Text style={styles.textSign}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
export default ChangePass;
