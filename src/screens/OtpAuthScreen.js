import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import OTPInputView from 'react-native-otp-input';

export default class OTPAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Xác thực bằng mã OTP',
      code: '',
    };
  }
  static navigationOptions = {
    title: 'OTPAuth',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <OTPInputView
          style={{ height: 100 }}
          pinCount={6}
          code={this.state.code}
          autoFocusOnLoad
          onCodeFilled={(code) => this.setState({ code })}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <Text>{this.props.navigation.getParam('phone', '')}</Text>
        <View style={styles.label}>
          <Button
            title="Xác thực"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button title="Gửi lại mã" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 8,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderColor: '#03DAC6',
  },
});