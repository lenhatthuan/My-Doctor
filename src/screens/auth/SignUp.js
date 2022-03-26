import React, {useState} from 'react';
import Form from '../../components/auth/Form';
import message from '../../config/message';
import {createUserWithEmailAndPassword  } from "@react-native-firebase/auth";

const SignUp = props => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);
  const [data, setData] = useState();

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
  createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  const signup = data => {
    try {
      setType(message.success);
      setContent('Mã xác thực sẽ được gửi đến số điện thoại này');
      setData(data);
      // setType(message.warning);
      // setContent('Số điện thoại đã được đăng ký');
    } catch (error) {
      setType(message.error);
      setContent(error);
    } finally {
      setVisible(true);
    }
  };
  return (
    <Form
      name="Đăng ký"
      submit={signup}
      visible={visible}
      content={content}
      type={type}
      navigation={props.navigation}

      press={() => {
        setVisible(false);
        if (type === message.success)
          props.navigation.push('OtpAuth', {
            data: data,
            action: "signup",
          });
      }}
    />
  );
};

export default SignUp;
