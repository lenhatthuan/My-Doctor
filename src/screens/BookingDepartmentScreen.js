import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  AsyncStorage,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { getRoomByDepartment } from "../store/actions/room";
import { createPosition, getAll } from "../store/actions/position";
import {
  convertTimeSelected,
  formatDateTime,
  formatDateCalandar,
} from "../utils/string-format";
import ErrorAlert from "../components/common/ErrorAlertComponent";

const BookingDepartmentScreen = (props) => {
  const [department, setDepartment] = React.useState("");
  const [room, setRoom] = React.useState([]);
  const [roomSelected, setRoomSelected] = React.useState("Không có");
  const [timeSelected, setTimeSelected] = React.useState("Sáng");
  const [dateSelected, setDateSelected] = React.useState(
    formatDateCalandar(new Date())
  );
  const [lAllPosition, setLAllposition] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isErrorAlert, setIsErrorAlert] = React.useState(false);
  const [messageAlert, setMessageAlert] = React.useState("");

  React.useEffect(() => {
    let { department } = props.route.params;
    setDepartment(department);
  });

  const onHandleErorrAlertPress = () => {
    setIsErrorAlert(false);
  }

  React.useEffect(() => {
    let { department } = props.route.params;
    setIsLoading(true);
    getRoomByDepartment(department).then((res) => {
      setIsLoading(false);
      if (res.count > 0) {
        setRoom(res);
        setRoomSelected(res[0].name);
      }
    });
  }, []);

  const NUMBER_STATE = {
    USED: "đã khám",
    NOT_USE: "chưa khám",
    CANCEL: "hủy",
  };

  const dateBooking = () => {
    let date = new Date(dateSelected);
    const time = convertTimeSelected(timeSelected);
    date.setHours(time.split(" ")[0].split(":")[0]);
    date.setMinutes(time.split(" ")[0].split(":")[1]);
    return date;
  };

  const isNotExitPosition = (id, roomName, datePosition, lPosition) => {
    let not = true;
    lPosition.forEach((p) => {
      if (
        p.patientId == id &&
        p.room == roomName &&
        formatDateTime(p.date) == formatDateTime(datePosition) &&
        p.state == NUMBER_STATE.NOT_USE
      ) {
        not = false;
      }
    });
    return not;
  };

  const createPositionByAPI = (name, number, lPosition) => {
    AsyncStorage.getItem("patientData").then((res) => {
      const id = JSON.parse(res).patientId;
      let date = dateBooking();
      if (isNotExitPosition(id, name, date, lPosition)) {
        createPosition(id, name, date, number).then((res) => {
          if (res) console.log("suscess!");
          else console.log("looix");
        });
      } else {
        console.log("Da ton tai");
      }
    });
  };


  const isValidateBooking = () => {
      if(room.length == 0) return false;
      else return false;
  }

  const createBooking = () => {
    if(isValidateBooking()) {
      getAll().then((res) => {
        let lPosition = res;
        console.log("res: " + res);
        setLAllposition(lAllPosition);
        let number = 0;
        let date = dateBooking();
        for (let i = 0; i < lPosition.length; i++) {
          if (
            formatDateTime(lPosition[i].date) == formatDateTime(date) &&
            lPosition[i].room == roomSelected
          )
            number = number + 1;
        }
        createPositionByAPI(roomSelected, number, lPosition);
      });
    } else {
      setMessageAlert("Bạn chưa chọn phòm khám!");
      setIsErrorAlert(true);
    }
  };

  const onHandleRoomSelected = (room) => {
    setRoomSelected(room);
  };

  const onHandleTimeSelected = (time) => {
    setTimeSelected(time);
  };

  const TIMES = ["Sáng", "Chiều"];

  const selectedDate = () => {
    console.log("date: " + dateSelected);
    return {
      dateSelected: { selected: true, marked: true, selectedColor: "blue" },
    };
  };

  const renderTime = ({ item }) => {
    return (
      <TouchableOpacity
        style={
          timeSelected === item
            ? {
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                flex: 1,
                width: 100,
                margin: 5,
                backgroundColor: "#1DB9C3",
              }
            : {
                borderWidth: 1,
                borderColor: "#1DB9C3",
                borderRadius: 5,
                padding: 5,
                flex: 1,
                width: 100,
                margin: 5,
              }
        }
        // style={{
        //   borderWidth: 1,
        //   borderColor: "#57CC99",
        //   borderRadius: 5,
        //   padding: 5,
        //   flex: 1,
        //   width: 100,
        //   margin: 5
        // }}
        onPress={() => {
          onHandleTimeSelected(item);
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderRoom = ({ item }) => {
    return (
      <TouchableOpacity
        style={
          roomSelected === item.name
            ? {
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
                flex: 1,
                width: 100,
                margin: 5,
                backgroundColor: "#57CC99",
              }
            : {
                borderWidth: 1,
                borderColor: "#57CC99",
                borderRadius: 5,
                padding: 5,
                flex: 1,
                width: 100,
                margin: 5,
              }
        }
        // style={{
        //   borderWidth: 1,
        //   borderColor: "#57CC99",
        //   borderRadius: 5,
        //   padding: 5,
        //   flex: 1,
        //   width: 100,
        //   margin: 5
        // }}
        onPress={() => {
          onHandleRoomSelected(item.name);
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView>
        <ErrorAlert visible = {isErrorAlert} message = {messageAlert} onPress = {onHandleErorrAlertPress}/>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textTransform: "uppercase",
              color: "#009DAE",
              textAlign: "center",
            }}
          >
            Đặt lịch khám theo
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              color: "#FF5403",
              fontWeight: "bold",
            }}
          >
            Chuyên khoa {department}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            height: 400,
            boxShadow:
              "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
          }}
        >
          <Text style={{ marginBottom: 10, fontWeight: "bold", padding: 5 }}>
            Chọn lịch khám
          </Text>
          <View
            style={{
              width: "100%",
              flex: 1,
              height: "100%",
              padding: 5,
              boxShadow:
                "0 2px 5px 0 rgb(0 0 0 /20%), 0 2px 10px 0 rgb(0 0 0 /10%)",
            }}
          >
            <Calendar
              theme={{
                textSectionTitleDisabledColor: "#d9e1e8",
              }}
              markingType={"period"}
              //   current={currentDate}
              minDate={formatDateCalandar(new Date())}
              pastScrollRange={50}
              futureScrollRange={50}
              scrollEnabled={true}
              horizontal={true}
              showScrollIndicator={true}
              disableMonthChange={true}
              onDayPress={(day) => {
                setDateSelected(day.dateString);
              }}
              markedDates={selectedDate()}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                todayTextColor: "#57B9BB",
                dayTextColor: "#222222",
                textDisabledColor: "#d9e1e8",
                monthTextColor: "#57B9BB",
                arrowColor: "#57B9BB",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "500",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                selectedDayBackgroundColor: "#57B9BB",
                selectedDayTextColor: "#00A19D",
                textDayHeaderFontSize: 8,
              }}
            />

            <View
              style={{
                width: "100%",
                padding: 5,
                borderColor: "#FF5403",
                backgroundColor: "white",
                borderWidth: 1,
              }}
            >
              <Text style={{ textAlign: "center" }}>
                Ngày đã chọn: {dateSelected}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 5 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Chọn phòng khám
          </Text>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {isLoading == true ? (
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 10
                }}
              >
                <Image
                  source={require("../../assets/imgs/loadComponent.gif")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            ) : null}
            <FlatList
              data={room}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderRoom}
              horizontal={true}
            />
            {room.length == 0 && isLoading == false ? (
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 20
                }}
              ><Text style = {{textAlign: 'center', fontWeight:'bold', color: '#000957'}}>Không có phòng khám cho chuyên khoa này</Text></View>
            ) : null}
          </View>
          <View
            style={{
              width: "100%",
              padding: 5,
              borderColor: "#FF5403",
              backgroundColor: "white",
              borderWidth: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              Phòng khám đã chọn: {roomSelected}
            </Text>
          </View>
        </View>

        <View style={{ padding: 5 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Chọn thời gian khám
          </Text>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <FlatList
              data={TIMES}
              keyExtractor={(item) => item.toString()}
              renderItem={renderTime}
              horizontal={true}
            />
          </View>
          <View
            style={{
              width: "100%",
              padding: 5,
              borderColor: "#FF5403",
              backgroundColor: "white",
              borderWidth: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>
              Thời gian đã chọn: {timeSelected}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            textAlign: "center",
          }}
        >
          <Pressable style={styles.btnSave} onPress={() => createBooking()}>
            <Text style={styles.txtSave}>Đặt lịch</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    marginTop: 10,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  btnSave: {
    width: "90%",
    backgroundColor: "#F90716",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  txtSave: {
    fontWeight: "bold",
    color: "white",
  },
});

export default BookingDepartmentScreen;
