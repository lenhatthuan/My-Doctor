import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../../theme/style";

function Department({ name, color, department, onPress }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Icon
        name={name}
        type="font-awesome-5"
        color={color}
        raised
        size={34}
        onPress={() => {
          onPress(department);
        }}
      />
      <Text>{department}</Text>
    </View>
  );
}

export default function DepartmentList({ onPress }) {
  return (
    <View>
      <View style={styles.table}>
        <Department
          name="lungs"
          color="cornflowerblue"
          department="Hô hấp"
          onPress={onPress}
        />
        <Department
          name="assistive-listening-systems"
          color="navajowhite"
          department="Tai-Mũi-Họng"
          onPress={onPress}
        />
        <Department
          name="eye"
          color="dodgerblue"
          department="Mắt"
          onPress={onPress}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="brain"
          color="coral"
          department="Thần kinh"
          onPress={onPress}
        />
        <Department
          name="tooth"
          color="whitesmoke"
          department="Răng-Hàm-Mặt"
          onPress={onPress}
        />
        <Department
          //name="kidney"
          name="question"
          color="indianred"
          department="Thận"
          onPress={onPress}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="baby"
          color="navajowhite"
          department="Phụ sản"
          onPress={onPress}
        />
        <Department
          name="heartbeat"
          color="red"
          department="Tim mạch"
          onPress={onPress}
        />
        <Department
          name="child"
          color="royalblue"
          department="Nhi"
          onPress={onPress}
        />
      </View>
      <View style={styles.table}>
        <Department
          //name="stomach"
          name="question"
          color="orangered"
          department="Tiêu hóa"
          onPress={onPress}
        />
        <Department
          name="bone"
          color="whitesmoke"
          department="Cơ-Xương-Khớp"
          onPress={onPress}
        />
        <Department
          name="allergies"
          color="navajowhite"
          department="Da liễu"
          onPress={onPress}
        />
      </View>
    </View>
  );
}
