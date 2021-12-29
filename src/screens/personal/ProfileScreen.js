import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { DataTable } from "react-native-paper";
import { Avatar, Icon } from "react-native-elements";
import { styles } from "../../theme/basic";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate } from "../../utils/string-format";

export default function ProfileScreen(props) {
  const [avatar, setAvatar] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("patientData").then((res) => {
        const patient = JSON.parse(res);
        if (!patient.avatar)
          setAvatar(
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          );
        else setAvatar(patient.avatar);
        setFullname(patient.fullName);
        setBirthdate(patient.birthDate);
        setGender(patient.gender);
        setAddress(patient.address);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Avatar
        containerStyle={{ alignSelf: "center", margin: 20 }}
        size={100}
        rounded
        source={{
          uri: avatar,
        }}
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
          Thông tin cá nhân
        </Text>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 1 }}>
              <Icon name="person" color="blue" />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>Họ và tên</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>{fullname}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 1 }}>
              <Icon name="today" color="gold" />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>Ngày sinh</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>
              {birthdate ? formatDate(birthdate) : null}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 1 }}>
              <Icon name="transgender" type="font-awesome" color="purple" />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>Giới tính</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>{gender}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 1 }}>
              <Icon name="place" color="red" />
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>Địa chỉ</DataTable.Cell>
            <DataTable.Cell style={{ flex: 5 }}>{address}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

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
            onPress={() =>
              props.navigation.navigate("ChangeProfile", {
                avatar: avatar,
                fullname: fullname,
                birthdate: birthdate,
                gender: gender,
                address: address,
              })
            }
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Cập nhật
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("ChangePass")}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}
