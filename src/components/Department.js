import React from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../theme/style";

function Department({ name, color, department, booking }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Icon
        name={name}
        type="font-awesome-5"
        color={color}
        raised
        size={34}
        onPress={booking}
      />
      <Text>{department}</Text>
    </View>
  );
}

export default function DepartmentList({ booking }) {
  return (
    <View>
      <View style={styles.table}>
        <Department
          name="lungs"
          color="cornflowerblue"
          department="Hô hấp"
          booking={booking}
        />
        <Department
          name="assistive-listening-systems"
          color="navajowhite"
          department="Tai-Mũi-Họng"
          booking={booking}
        />
        <Department
          name="eye"
          color="dodgerblue"
          department="Mắt"
          booking={booking}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="brain"
          color="coral"
          department="Thần kinh"
          booking={booking}
        />
        <Department
          name="tooth"
          color="whitesmoke"
          department="Răng-Hàm Mặt"
          booking={booking}
        />
        <Department
          name="kidney"
          color="indianred"
          department="Thận"
          booking={booking}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="baby"
          color="navajowhite"
          department="Phụ sản"
          booking={booking}
        />
        <Department
          name="heartbeat"
          color="red"
          department="Tim mạch"
          booking={booking}
        />
        <Department
          name="child"
          color="royalblue"
          department="Nhi"
          booking={booking}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="stomach"
          color="orangered"
          department="Tiêu hóa"
          booking={booking}
        />
        <Department
          name="bone"
          color="whitesmoke"
          department="Co-Xuong-khop"
          booking={booking}
        />
        <Department
          name="allergies"
          color="navajowhite"
          department="Da liễu"
          booking={booking}
        />
      </View>
    </View>
  );
}
