import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../theme/style";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Booking({ exit, booking }) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (mode === "date") setDate(selectedDate || date);
    else setTime(selectedDate || time);
  };

  return (
    <View style={styles.bookingView}>
      <Icon
        name="close"
        onPress={exit}
        containerStyle={{ alignItems: "flex-end" }}
      />
      <Text style={styles.bookingTitle}>Đặt lịch khám</Text>
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
        <Button title="Đặt lịch" onPress={booking} />
      </View>
    </View>
  );
}
