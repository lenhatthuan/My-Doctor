import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, AsyncStorage } from "react-native";
import { styles } from "../theme/style";
import { getPositionsByPatient } from "../store/actions/position";

export default function PositionScreen(props) {
  const [data, setData] = useState();

  useEffect(() => {
    getPositionsByPatient()
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>Phòng {item.room}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ alignItems: "center" }}>
            <Text>STT của bạn</Text>
            <Text>{item.number}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>STT đang khám</Text>
            <Text>jhdfja</Text>
          </View>
        </View>
        <Text>Thời gian dự kiến: {item.date}</Text>
        <View style={{ justifyContent: "flex-end" }}>
          <Button title="Hủy" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch khám</Text>
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
