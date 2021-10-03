import React from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../theme/style";
import { DatePicker } from "react-native-woodpicker";

export default function Booking({ exit }) {
  const [date, setDate] = React.useState(new Date());
  const [schedule, setSchedule] = React.useState();

  return (
    <View style={styles.container}>
      <Icon
        name="times"
        type="font-awesome-5"
        onPress={exit}
        containerStyle={{ alignItems: "flex-end" }}
      />
      <Text style={styles.title}>Đặt lịch khám</Text>
      <Text style={styles.label}>Ngày khám</Text>
      <DatePicker
        style={styles.input}
        value={date}
        onDateChange={(text) => setDate(text)}
        text={date.toLocaleDateString()}
        iosDisplay="inline"
      />
      <Text style={styles.label}>Giờ khám</Text>
      <Text style={styles.label}>Lịch trực</Text>
      <View style={styles.button}>
        <Button title="Đặt lịch" />
      </View>
    </View>
  );
}
