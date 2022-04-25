import React, {useState} from 'react';
import Form from '../../components/auth/Form';
import message from '../../config/message';
import {isAccount} from '../../store/actions/account';

const SignUp = props => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);
  const [data, setData] = useState();

  const signup = async data => {
    try {
      const result = await isAccount(data.phone);
      if (result === 0) {
        setType(message.success);
        setContent('Mã xác thực sẽ được gửi đến số điện thoại này');
        setData(data);
      } else {
        setType(message.warning);
        setContent('Số điện thoại đã được đăng ký');
      }
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
            action: 'signup',
          });
      }}
    />
  );
};

export default SignUp;
