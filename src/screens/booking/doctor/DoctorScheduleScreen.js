import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import HeaderBackComponent from "../../../components/common/HeaderBackComponent";
import { formatDate, formatDateTime } from "../../../utils/string-format";
import {
  createPosition,
  getAll,
} from "../../../store/actions/position";
import { convertStringToDate } from "../../../utils/convert-date";
export default function DoctorScheduleScreen({ route, navigation }) {
  const { schedule, room, doctor, date } = route.params;
  const [lAllPosition, setLAllposition] = React.useState([]);

  const getNameByIdRoom = (id) => {
    for (let i = 0; i < room.length; i++) {
      if (room[i].id == id) return room[i].name;
    }
    return "Không có phòng";
  };

  const NUMBER_STATE = {
    USED: "đã khám",
    NOT_USE: "chưa khám",
    CANCEL: "hủy",
  };

  const convertSession = (session) => {
    if (session == "AM") return "SÁNG";
    return "CHIỀU";
  };

  const convertTimeSelected = (session) => {
    if (session == "AM") return "7:00 AM";
    return "14:00"; //Chiều
  }

  const dateBooking = (dateP, session) => {
    let dateConvert = convertStringToDate(dateP);
    const time = convertTimeSelected(session);
    dateConvert.setHours(time.split(" ")[0].split(":")[0]);
    dateConvert.setMinutes(time.split(" ")[0].split(":")[1]);
    return dateConvert;
  };

  const isNotExitPosition = (id, roomName, datePosition, lPosition) => {
    let not = true;
    lPosition.forEach((p) => {
      if (
        p.patientId == id &&
        p.room == roomName &&
        formatDateTime(p.date) == formatDateTime(datePosition)
        && p.state == NUMBER_STATE.NOT_USE
      ) {
        not = false;
      }
    });
    return not;
  };

  const createPositionByAPI = (name, session, number, lPosition) => {
    AsyncStorage.getItem("patientData").then((res) => {
      const id = JSON.parse(res).patientId;
      let dateConvert = dateBooking(date, session);
      if (isNotExitPosition(id, name, dateConvert, lPosition)) {
        createPosition(id, name, dateConvert, number).then((res) => {
          if (res)
            Alert.alert(
              "Đặt lịch khám thành công",
              "Tại phòng: " +
                name +
                " vào buổi: " +
                convertSession(session) +
                " ngày: " +
                date,
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("AllDoctor");
                  },
                },
              ]
            );
          else alert("Chưa đặt được lịch khám!");
        });
      } else {
        Alert.alert(
          " Lịch khám của bạn đã được đặt từ trước!!",
          "Tại phòng: " +
            name +
            " vào buổi: " +
            convertSession(session) +
            " ngày: " +
            date,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("cancel");
              },
            },
          ]
        );
      }
    });
  };

  const addPosition = (name, session) => {
    getAll().then((res) => {
      let lPosition = res;
      setLAllposition(lAllPosition);
      let number = 0;
      let dateConvert = convertStringToDate(date);
      for (let i = 0; i < lPosition.length; i++) {
        if (
          formatDate(lPosition[i].date) == formatDate(dateConvert) &&
          lPosition[i].room == name
        )
          number = number + 1;
      }
      createPositionByAPI(name, session, number, lPosition);
    });
  };

  const alertAddPosition = (roomId, sesstion) => {
    const name = getNameByIdRoom(roomId);
    Alert.alert(
      "Đặt lịch khám bác sĩ " + doctor.fullname,
      "Tại phòng: " +
        name +
        " vào buổi: " +
        convertSession(sesstion) +
        " ngày: " +
        date,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            addPosition(name, sesstion);
          },
        },
      ]
    );
  };

  const onBack = () => {
    navigation.navigate("DoctorProfile", { doctor: doctor });
  };

  const renderRoom = ({ item }) => {
    return (
      <Pressable
        style={{
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          borderRadius: 3,
          elevation: 3,
        }}
        onPress={() => {
          alertAddPosition(item.roomId, item.session);
        }}
      >
        <View>
          <Text style={{ color: "#113CFC", fontWeight: "bold" }}>
            {getNameByIdRoom(item.roomId)}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "500" }}>
            {convertSession(item.session)}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <HeaderBackComponent onBack={onBack} title={doctor.fullname} />
      </View>
      <View
        style={{
          marginTop: 10,
          width: "80%",
          backgroundColor: "#0ED3EE",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "500", color: "white" }}>{date}</Text>
      </View>
      <View style={styles.room}>
        <FlatList data={schedule} renderItem={renderRoom}></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  room: {
    flex: 1,
  },

  roomComponent: {
    width: 100,
    height: 100,
  },

  headerContainer: {
    width: "100%",
  },

  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
