import React, { useEffect } from "react";
import {
  Switch,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { DatePicker } from "react-native-woodpicker";
import TYPES from "../models/types";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getProfile } from "../store/actions/patient";
import { styles } from "../theme/style";

export default function ProfileScreen(props) {
  const [avatar, setAvatar] = React.useState(
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
  );
  const [fullname, setFullname] = React.useState();
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [gender, setGender] = React.useState(false);
  const [address, setAddress] = React.useState();

  useEffect(() => {
    getProfile()
      .then((result) => {
        if (result != null) {
          setAvatar(result.avatar);
          setFullname(result.fullname);
          //setBirthdate(new Date(result.birthDate));
          result.gender === TYPES.GENDER.FEMALE
            ? setGender(true)
            : setGender(false);
          setAddress(result.address);
        }
      })
      .catch((err) => console.error(err));
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <Avatar
        size="large"
        rounded
        source={{
          uri: avatar,
        }}
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            uri: true,
          });
          if (!result.cancelled) {
            setAvatar(result.uri);
          }
        }}
      />
      <Text style={styles.label}>Họ và tên</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFullname(text)}
        value={fullname}
      />
      <Text style={styles.label}>Ngày sinh</Text>
      <DatePicker
        style={{ height: 50, borderWidth: 1 }}
        value={birthdate}
        onDateChange={(text) => setBirthdate(text)}
        text={birthdate.toLocaleDateString()}
        iosDisplay="inline"
      />
      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.space}>
        <Switch
          onValueChange={() => setGender((previousState) => !previousState)}
          value={gender}
        />
        <Text>{gender ? TYPES.GENDER.FEMALE : TYPES.GENDER.MALE}</Text>
      </View>
      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAddress(text)}
        value={address}
      />
      <View style={styles.space}>
        <Button
          title="Cập nhật"
          // onPress={() => {
          //   fetch(
          //     //id
          //     "https://still-wave-21655.herokuapp.com/patient/11ea7b72-85f2-4e4f-b1ac-3275e9c91699",
          //     {
          //       method: "PUT",
          //       headers: {
          //         Accept: "application/json",
          //         "Content-Type": "application/json",
          //       },
          //       body: JSON.stringify({
          //         //avatar: atob(this.state.avatar),
          //         fullname: this.state.name,
          //         birthDate: this.state.pickedDate,
          //         gender: this.state.checked,
          //         address: this.state.address,
          //       }),
          //     }
          //   );
          // }}
        />
        <Button
          title="Đổi mật khẩu"
          onPress={() => props.navigation.navigate("ChangePass")}
        />
      </View>
    </SafeAreaView>
  );
}
