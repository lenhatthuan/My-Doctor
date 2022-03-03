import React, {useState} from 'react';
import Form from '../../components/auth/Form';
import message from '../../config/message';

const SignIn = props => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);

  const signin = data => {
    try {
      setType(message.success);
      setContent('Đăng nhập thành công');

      // setType(message.warning);
      // setContent('Số điện thoại hoặc mật khẩu không đúng');
    } catch (error) {
      setType(message.error);
      setContent(error);
    } finally {
      setVisible(true);
    }
  };
  return (
    <Form
      name="Đăng nhập"
      submit={signin}
      visible={visible}
      content={content}
      type={type}
      navigation={props.navigation}
      press={() => {
        setVisible(false);
        if (type === message.success) props.navigation.push('Dashboard');
      }}
    />
  );
};

export default SignIn;
