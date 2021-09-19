import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image,
  ImageStore,
} from "react-native";
import { DatePicker } from "react-native-woodpicker";
import { RadioButton, Avatar } from "react-native-paper";
import TYPES from "../models/types";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Thông tin cá nhân",
      lbName: "Họ và tên",
      lbGender: "Giới tính",
      ldMale: TYPES.GENDER.MALE,
      lbFemale: TYPES.GENDER.FEMALE,
      lbBirthYear: "Năm sinh",
      lbAddress: "Địa chỉ",
      avatar: null,
      name: "",
      pickedDate: new Date(),
      checked: TYPES.GENDER.MALE,
      address: "",
    };
  }

  async componentDidMount() {
    await fetch(
      "https://still-wave-21655.herokuapp.com/patient/11ea7b72-85f2-4e4f-b1ac-3275e9c91699"
      //id
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          avatar: result.patient.avatar,
          name: result.patient.fullName,
          pickedDate: new Date(result.patient.birthDate),
          checked: result.patient.gender,
          address: result.patient.address,
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.title}</Text>
        <Image
          style={styles.avatar}
          source={{ uri: "data:image/png;base64," + this.state.avatar }}
        />
        <FontAwesome.Button
          iconStyle={{ marginRight: 0 }}
          backgroundColor="red"
          name="camera"
          onPress={async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              base64: true,
              allowsEditing: true,
            });
            if (!result.cancelled) {
              this.setState({ avatar: result.base64 });
            }
          }}
          borderRadius={100}
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
            value={TYPES.GENDER.MALE}
            status={
              this.state.checked == TYPES.GENDER.MALE ? "checked" : "unchecked"
            }
            onPress={(checked) => this.setState({ checked: TYPES.GENDER.MALE })}
          />
          <Text>{this.state.ldMale}</Text>
          <RadioButton
            value={TYPES.GENDER.FEMALE}
            status={
              this.state.checked == TYPES.GENDER.FEMALE
                ? "checked"
                : "unchecked"
            }
            onPress={(checked) =>
              this.setState({ checked: TYPES.GENDER.FEMALE })
            }
          />
          <Text>{this.state.lbFemale}</Text>
        </View>
        <Text style={styles.label}>{this.state.lbAddress}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(address) => this.setState({ address })}
          value={this.state.address}
        />
        <View style={styles.separator}>
          <Button
            title="Cập nhật"
            onPress={() => {
              fetch(
                //id
                "https://still-wave-21655.herokuapp.com/patient/11ea7b72-85f2-4e4f-b1ac-3275e9c91699",
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    //avatar: atob(this.state.avatar),
                    fullName: this.state.name,
                    birthDate: this.state.pickedDate,
                    gender: this.state.checked,
                    address: this.state.address,
                  }),
                }
              );
            }}
          />
          <Button
            title="Đổi mật khẩu"
            onPress={() =>
              this.props.navigation.navigate("ChangePass", {
                phone: this.state.phone,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 80,
    margin: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
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
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    margin: 20,
  },
  avatar: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});
