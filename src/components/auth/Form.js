import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import PhoneInput, {isValidNumber} from 'react-native-phone-number-input';
import {styles} from '../../theme/basic';
import Loading from '../common/Loading';
import Message from '../common/Message';

const Form = props => {
  const anim = useRef(new Animated.Value(0)).current;
  const [secure, setSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Loading visible={isLoading} message={props.name + '...'} />
      <Message {...props} />
      <View style={styles.header}>
        <Text style={styles.text_header}>{props.name}</Text>
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
        <Text style={styles.text_footer}>Số điện thoại</Text>
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCode="VN"
          value={phone}
          onChangeFormattedText={text => setPhone(text)}
        />
        <Text style={[styles.text_footer, {marginTop: 35}]}>
          Mật khẩu {props.name === 'Quên mật khẩu' && 'mới'}
        </Text>
        <View style={styles.action}>
          <Icon name="lock" color="#009387" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#666666"
            style={styles.textInput}
            secureTextEntry={secure}
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
          />
          <Icon
            name={secure ? 'eye-with-line' : 'eye'}
            type="entypo"
            color="#009387"
            onPress={() => setSecure(!secure)}
          />
        </View>
        {props.name === 'Đăng nhập' && (
          <TouchableOpacity onPress={() => props.navigation.push('ForgotPass')}>
            <Text style={{color: '#009387', marginTop: 15}}>
              Bạn quên mật khẩu?
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.button}>
          <TouchableOpacity
            disabled={!(isValidNumber(phone) && password)}
            style={[styles.signIn, {backgroundColor: '#009387'}]}
            onPress={() => {
              setIsLoading(true);
              props.submit({phone, password});
              setIsLoading(false);
            }}>
            <Text style={styles.textSign}>{props.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.name !== 'Đăng nhập'
                ? props.navigation.pop()
                : props.navigation.push('SignUp')
            }
            style={[styles.signIn, {marginTop: 15}]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>
              {props.name !== 'Đăng nhập' ? 'Đăng nhập' : ' Đăng ký'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
export default Form;
