import React, { useEffect } from "react";
import {
  Switch,
  View,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  Alert,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import { DatePicker } from "react-native-woodpicker";
import TYPES from "../models/types";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "../store/actions/patient";
import { isLogin } from "../store/actions/account";
import { styles, image } from "../theme/style";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen(props) {
  const [avatar, setAvatar] = React.useState(image.avatar);
  const [fullname, setFullname] = React.useState();
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [gender, setGender] = React.useState();
  const [address, setAddress] = React.useState();

  useFocusEffect(
    React.useCallback(() => {
      isLogin().then((res) => {
        if (!res) {
          setProfile();
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
          });
        }
      });
      //alert("Screen was focused");
      // Do something when the screen is focused
    }, [])
  );

  //useEffect ko load trong bottom tab
  // useEffect(() => {
  //   isLogin().then((res) => {
  //     if (!res) {
  //       setProfile();
  //     } else {
  //       AsyncStorage.getItem("patientData").then((res) => {
  //         const patient = JSON.parse(res);
  //         console.log(patient);
  //         setProfile(
  //           patient.avatar,
  //           patient.fullName,
  //           patient.birthDate,
  //           patient.gender,
  //           patient.address
  //         );
  //       });
  //     }
  //   });
  // }, []);

  const setProfile = (
    avatar = image.avatar,
    fullName = "",
    birthDate = new Date(),
    gender = TYPES.GENDER.MALE,
    address = ""
  ) => {
    setAvatar(avatar ? avatar : image.avatar);
    setFullname(fullName);
    setBirthdate(new Date(birthdate));
    gender === TYPES.GENDER.FEMALE ? setGender(true) : setGender(false);
    setAddress(address);
  };

  //api updateProfile thực hiện ko đúng
  const showMessage = () => {
    const sex = gender ? TYPES.GENDER.FEMALE : TYPES.GENDER.MALE;
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: image.background,
        }}
        style={styles.container}
      >
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
          style={styles.input}
          onChangeText={(text) => setFullname(text)}
          value={fullname}
        />
        <Text style={styles.label}>Ngày sinh</Text>
        <DatePicker
          style={styles.input}
          value={birthdate}
          onDateChange={(text) => setBirthdate(text)}
          text={birthdate.toLocaleDateString()}
          iosDisplay="inline"
        />
        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.gender}>
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
          <Button title="Cập nhật" onPress={showMessage} />
          <Button
            title="Đổi mật khẩu"
            onPress={() => props.navigation.navigate("ChangePass")}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
