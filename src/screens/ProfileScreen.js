import React, { useEffect, useState, useCallback } from "react";
import {
  Switch,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Alert,
  AsyncStorage,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GENDER } from "../models/types";
import { updateProfile } from "../store/actions/patient";
import { isLogin } from "../store/actions/account";
import { styles, image } from "../theme/style";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen(props) {
  const [avatar, setAvatar] = useState(image.avatar);
  const [fullname, setFullname] = useState();
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      isLogin().then((res) => {
        if (!res) {
          setProfile();
          setDisabled(true);
        } else {
          AsyncStorage.getItem("patientData").then((res) => {
            const patient = JSON.parse(res);
            console.log(patient);
            setProfile(
              patient.avatar,
              patient.fullName,
              patient.birthDate,
              patient.gender,
              patient.address
            );
            setDisabled(false);
          });
        }
      });
    }, [])
  );

  const setProfile = (
    avatar = image.avatar,
    fullName = "",
    birthDate = new Date(),
    gender = GENDER.MALE,
    address = ""
  ) => {
    setAvatar(avatar ? avatar : image.avatar);
    setFullname(fullName);
    setBirthdate(new Date(birthdate));
    gender === GENDER.FEMALE ? setGender(true) : setGender(false);
    setAddress(address);
  };

  //api updateProfile thực hiện ko đúng
  const showMessage = () => {
    const sex = gender ? GENDER.FEMALE : GENDER.MALE;
    AsyncStorage.getItem("accountData").then((res) => {
      const id = JSON.parse(res).accountId;
      updateProfile(id, avatar, fullname, birthdate, sex, address)
        .then((result) => {
          Alert.alert("Cập nhật thông tin cá nhân thành công");
        })
        .catch((err) => {
          Alert.alert("Cập nhật thông tin cá nhân không thành công");
        });
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      uri: true,
    });
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    setBirthdate(selectedDate || birthdate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <Avatar
        containerStyle={{ alignSelf: "center" }}
        size="large"
        rounded
        source={{
          uri: avatar,
        }}
        onPress={pickImage}
      />
      <Text style={styles.label}>Họ và tên</Text>
      <TextInput
        style={[styles.date, { width: 160 }]}
        onChangeText={(text) => setFullname(text)}
        value={fullname}
        autoCapitalize="words"
      />
      <Text style={styles.label}>Ngày sinh</Text>
      <View style={styles.date}>
        <Text style={{ width: 120 }}>{birthdate.toLocaleDateString()}</Text>
        <Icon
          name="today"
          onPress={() => {
            setShow(true);
          }}
        />
      </View>
      {show && (
        <DateTimePicker
          value={new Date()}
          maximumDate={new Date()}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.gender}>
        <Switch
          onValueChange={() => setGender((previousState) => !previousState)}
          value={gender}
        />
        <Text>{gender ? GENDER.FEMALE : GENDER.MALE}</Text>
      </View>
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        multiline
        style={styles.inputBottom}
        onChangeText={(text) => setAddress(text)}
        value={address}
      />
      <View style={styles.space}>
        <Button
          disabled={disabled || !fullname}
          title="Cập nhật"
          onPress={showMessage}
        />
        <Button
          disabled={disabled}
          title="Đổi mật khẩu"
          onPress={() => props.navigation.navigate("ChangePass")}
        />
      </View>
    </SafeAreaView>
  );
}
