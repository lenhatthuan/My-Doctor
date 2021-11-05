import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../theme/style";
import { Icon } from "react-native-elements";
import { getDoctor } from "../store/actions/doctor";

export default function Record({ item, onPress }) {
  const [doctorName, setDoctorName] = useState();

  useEffect(() => {
    getDoctor(item.doctorId)
      .then((res) => setDoctorName(res.fullname))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.record}>
      <View>
        <Text style={{ color: "white", fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ color: "white" }}>BS. {doctorName}</Text>
      </View>
      <View>
        <Text style={{ color: "white" }}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon
            containerStyle={{ marginLeft: 5 }}
            name="file-medical"
            type="font-awesome-5"
            color="white"
            onPress={() => onPress(item.fileStore)}
          />
          <Icon
            name="capsules"
            type="font-awesome-5"
            color="white"
            onPress={() => onPress(item.precription)}
          />
        </View>
      </View>
    </View>
  );
}
