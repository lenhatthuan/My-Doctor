import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { DatePicker } from 'react-native-woodpicker';
import { RadioButton, Avatar } from 'react-native-paper';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Thông tin cá nhân',
      lbName: 'Họ và tên',
      lbGender: 'Giới tính',
      ldMale: 'Nam',
      lbFemale: 'Nữ',
      lbBirthYear: 'Năm sinh',
      lbAddress: 'Địa chỉ',
      code: null,
      pickedDate: new Date(),
      checked: 'nam',
      adress: null,
    };
  }
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Avatar.Image
          size={24}
          //source={require('./snack-icon.png')}
        />
        <Text style={styles.label}>{this.state.lbName}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />
        <Text style={styles.label}>{this.state.lbBirthYear}</Text>
        <DatePicker
          style={{ height: 50, borderWidth: 1 }}
          value={this.state.pickedDate}
          onDateChange={(pickedDate) => this.setState({ pickedDate })}
          text={this.state.pickedDate.toLocaleDateString()}
          iosDisplay="inline"
        />
        <Text style={styles.label}>{this.state.lbGender}</Text>
        <View style={styles.row}>
          <RadioButton
            value="nam"
            status={this.state.checked == 'nam' ? 'checked' : 'unchecked'}
            onPress={(checked) => this.setState({ checked: 'nam' })}
          />
          <Text>{this.state.ldMale}</Text>
          <RadioButton
            value="nữ"
            status={this.state.checked == 'nữ' ? 'checked' : 'unchecked'}
            onPress={(checked) => this.setState({ checked: 'nữ' })}
          />
          <Text>{this.state.lbFemale}</Text>
        </View>
        <Text style={styles.label}>{this.state.lbAddress}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.adrress}
        />
        <Button title="Cập nhật" />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 80,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  label: {
    fontSize: 15,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});