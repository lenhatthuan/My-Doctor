import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "../theme/style";
import { getRecordByPatient } from "../store/actions/record";

export default function RecordScreen(props) {
  const [data, setData] = useState();
  useEffect(() => {
    getRecordByPatient()
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.push("RecordDetail")}
        style={styles.table}
      >
        <View>
          <Text>{item.department}</Text>
          <Text>{item.disease}</Text>
        </View>
        <Text>{item.date}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ sơ bệnh án</Text>
      <FlatList
        ListEmptyComponent={
          <Text style={{ justifyContent: "center" }}>Trống</Text>
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={id}
      />
    </View>
  );
}
