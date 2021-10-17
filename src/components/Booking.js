import React, { useState } from "react";
import { View, Text, Button, Alert, AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../theme/style";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getRoomByDepartment } from "../store/actions/room";
import { getTime } from "../store/actions/department";
import { getDepartment } from "../store/actions/department";
import { createPosition, getMaxPosition } from "../store/actions/position";
import { List } from "react-native-paper";

export default function Booking({
  option,
  department,
  doctorId,
  exit,
  booking,
}) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (mode === "date") setDate(selectedDate || date);
    else setTime(selectedDate || time);
  };

  const handler = () => {
    const hours = time.getHours();
    const day = date.getDay();
    if (
      ((hours >= 7 && hours <= 11) || (hours >= 13 && hours <= 16)) &&
      day !== 7 &&
      day !== 6
    ) {
      AsyncStorage.getItem("patientData").then((res) => {
        const id = JSON.parse(res).patientId;

        switch (option) {
          case 0:
            break;
          case 1:
            // let max = 0;
            // let number = 0;
            // getDepartment(department)
            //   .then((result) => {
            //     number = parseInt(time.getMinutes() / result.time);
            //     max = parseInt((8 * 60) / result.time);
            //   })
            //   .then(() => {
            //     let created = false;
            //     getMaxPosition(department, date.toJSON().split("T")[0])
            //       .then((array) => {
            //         if (array.length === 0) {
            //           getRoomByDepartment(department).then((room) => {
            //             createPosition(
            //               id,
            //               room[0].name,
            //               date.toJSON().split("T")[0],
            //               number
            //             )
            //               .then((res) => (created = true))
            //               .catch((err) => console.error(err));
            //           });
            //         } else {
            //           ///position > maxNumber
            //           for (let i = 0; i < array.length; i++) {
            //             if (
            //               array[i].maxNumber < number &&
            //               number <= max &&
            //               created === false
            //             ) {
            //               createPosition(
            //                 id,
            //                 element.room,
            //                 date.toJSON().split("T")[0],
            //                 number
            //               )
            //                 .then((res) => (created = true))
            //                 .catch((err) => console.error(err));
            //               console.log(created);
            //             } else break;
            //           }

            //           //position <= maxNumber
            //           // if (created === false) {
            //           //   array.sort((a, b) => a.maxNumber - b.maxNumber);
            //           //   let t = 1;
            //           //   const min = array[0].maxNumber;
            //           //   while (created === false) {
            //           //     for (let i = 0; i < array.length; i++) {
            //           //       if (
            //           //         array[i].maxNumber < min + t &&
            //           //         created === false &&
            //           //         min + t <= max
            //           //       ) {
            //           //         createPosition(
            //           //           id,
            //           //           array[i].room,
            //           //           date.toJSON().split("T")[0],
            //           //           min + t
            //           //         )
            //           //           .then((res) => (created = true))
            //           //           .catch((err) => console.error(err));
            //           //       } else break;
            //           //     }
            //           //     t++;
            //           //   }
            //           // }
            //         }
            //       })
            //       .catch((err) => console.error(err));
            //     if (created === true) booking;
            //   })
            //   .catch((err) => console.error(err));

            // // let created = false;

            // // getMaxPosition(department, date.toJSON().split("T")[0])
            // //   .then((array) => {
            // //     if (array.length === 0) {
            // //       getRoomByDepartment(department).then((room) => {
            // //         createPosition(
            // //           id,
            // //           room[0].name,
            // //           date.toJSON().split("T")[0],
            // //           position
            // //         )
            // //           .then((res) => (created = true))
            // //           .catch((err) => console.error(err));
            // //       });
            // //     } else {
            // //       ///position > maxNumber
            // //       for (let i = 0; i < array.length; i++) {
            // //         if (array[i].maxNumber < position && position <= max) {
            // //           createPosition(
            // //             id,
            // //             element.room,
            // //             date.toJSON().split("T")[0],
            // //             position
            // //           )
            // //             .then((res) => (created = true))
            // //             .catch((err) => console.error(err));
            // //         }
            // //       }

            // //       //position <= maxNumber
            // //       if (created === false) {
            // //         array.sort((a, b) => a.maxNumber - b.maxNumber);
            // //         let t = 1;
            // //         const min = array[0].maxNumber;
            // //         while (created === false) {
            // //           for (let i = 0; i < array.length; i++) {
            // //             if (
            // //               array[i].maxNumber < min + t &&
            // //               created === false &&
            // //               min + t <= max
            // //             ) {
            // //               createPosition(
            // //                 id,
            // //                 array[i].room,
            // //                 date.toJSON().split("T")[0],
            // //                 min + t
            // //               )
            // //                 .then((res) => (created = true))
            // //                 .catch((err) => console.error(err));
            // //             } else break;
            // //           }
            // //           t++;
            // //         }
            // //       }
            // //     }
            // //   })
            // //   .catch((err) => console.error(err));
            // // if (created === true) booking;
            break;
          default:
            break;
        }
      });
    } else {
      console.log("Không trong giờ hành chính");
      //Alert("Không trong giờ hành chính");
    }
  };

  return (
    <View style={styles.bookingView}>
      <Icon
        name="close"
        onPress={exit}
        containerStyle={{ alignItems: "flex-end" }}
      />
      <Text style={styles.bookingTitle}>Đặt lịch khám</Text>
      <Text style={styles.label}>Khoa {department}</Text>
      <Text style={styles.label}>Ngày khám</Text>
      <View style={[styles.date, { marginEnd: 20 }]}>
        <Text style={{ width: 100 }}>{date.toLocaleDateString()}</Text>
        <Icon
          name="today"
          onPress={() => {
            setShow(true);
            setMode("date");
          }}
        />
      </View>
      <Text style={styles.label}>Giờ khám</Text>
      <View style={[styles.date, { marginEnd: 20 }]}>
        <Text style={{ width: 100 }}>{time.toLocaleTimeString()}</Text>
        <Icon
          name="alarm"
          onPress={() => {
            setShow(true);
            setMode("time");
          }}
        />
      </View>
      {show && (
        <DateTimePicker
          value={new Date()}
          minimumDate={new Date()}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.button}>
        <Button title="Đặt lịch" onPress={handler} />
      </View>
    </View>
  );
}
