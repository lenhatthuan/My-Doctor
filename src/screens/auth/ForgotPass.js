import React, {useState} from 'react';
import Form from '../../components/auth/Form';
import message from '../../config/message';
import {isAccount} from '../../store/actions/account';

const ForgotPass = props => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);
  const [data, setData] = useState();

  const forgotPass = async data => {
    try {
      const result = await isAccount(data.phone);
      if (result !== 0) {
        setType(message.success);
        setContent('Mã xác thực sẽ được gửi đến số điện thoại này');
        setData(data);
      } else {
        setType(message.warning);
        setContent('Số điện thoại chưa được đăng ký');
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
      name="Quên mật khẩu"
      submit={forgotPass}
      visible={visible}
      navigation={props.navigation}
      content={content}
      type={type}
      press={() => {
        setVisible(false);
        if (type === message.success)
          props.navigation.push('OtpAuth', {
            data: data,
            action: 'forgotPass',
          });
      }}
    />
  );
};

export default ForgotPass;
