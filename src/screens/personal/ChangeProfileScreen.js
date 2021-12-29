import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  AsyncStorage,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { styles } from "../../theme/basic";
import { formatDate } from "../../utils/string-format";
import LoadingComponent from "../../components/common/LoadingComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getPatientById, updateProfile } from "../../store/actions/patient";
import { GENDER } from "../../models/types";
import { add } from "react-native-reanimated";

export default function ChangeProfileScreen(props) {
  const [avatar, setAvatar] = useState(props.route.params.avatar);
  const [fullname, setFullname] = useState(props.route.params.fullname);
  const [birthdate, setBirthdate] = useState(props.route.params.birthdate);
  const [gender, setGender] = useState(props.route.params.gender);
  const [address, setAddress] = useState(props.route.params.address);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

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
    setBirthdate(selectedDate);
  };

  const save = () => {
    AsyncStorage.getItem("accountData").then((res) => {
      const id = JSON.parse(res).accountId;
      setIsLoading(true);
      updateProfile(id, avatar, fullname, birthdate, gender, address)
        .then((result) => {
          getPatientById(id)
            .then(() => props.navigation.goBack())
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          setIsLoading(false);
          Alert.alert("Cập nhật thông tin cá nhân không thành công");
        });
    });
  };
  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          value={new Date(birthdate)}
          maximumDate={new Date()}
          mode="date"
          onChange={onChange}
        />
      )}
      <LoadingComponent visible={isLoading} message="Cập nhật..." />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Icon
        name="arrow-back"
        color="#009387"
        raised
        onPress={() => props.navigation.goBack()}
      />
      <Avatar
        containerStyle={{ alignSelf: "center", marginBottom: 20 }}
        size={100}
        rounded
        source={{
          uri: avatar,
        }}
        onPress={pickImage}
      />
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: "white",
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
            },
          ]}
        >
          Họ và tên
        </Text>
        <View style={styles.action}>
          <Icon name="person" color="#009387" />
          <TextInput
            value={fullname}
            placeholder="Your fullname"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={(text) => setFullname(text)}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 20,
            },
          ]}
        >
          Giới tính
        </Text>
        <View style={styles.action}>
          <Icon
            name="transgender"
            type="font-awesome"
            color="#009387"
            onPress={() =>
              gender === GENDER.MALE
                ? setGender(GENDER.FEMALE)
                : setGender(GENDER.MALE)
            }
          />
          <TextInput
            value={gender}
            placeholder="Your gender"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={(text) => setGender(text)}
            editable={false}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 20,
            },
          ]}
        >
          Ngày sinh
        </Text>
        <View style={styles.action}>
          <Icon name="today" color="#009387" onPress={() => setShow(true)} />
          <TextInput
            value={birthdate ? formatDate(birthdate) : null}
            placeholder="dd/MM/yyyy"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={(text) => setBirthdate(text)}
            editable={false}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: "#009387",
              marginTop: 20,
            },
          ]}
        >
          Địa chỉ
        </Text>
        <View style={styles.action}>
          <Icon name="place" color="#009387" />
          <TextInput
            value={address}
            placeholder="Your address"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={(text) => setAddress(text)}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                backgroundColor: "#009387",
              },
            ]}
            onPress={save}
            disabled={!(fullname && birthdate && gender && address)}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
