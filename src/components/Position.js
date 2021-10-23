import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { styles } from "../theme/style";
import { NUMBER_STATE } from "../models/types";
import { currentPosition, cancel } from "../store/actions/position";

export default function Position({ item, load }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (item.state === NUMBER_STATE.NOT_USE) {
      currentPosition(item.room, item.date)
        .then((res) => setCurrent(res))
        .catch((err) => console.error(err));
    }
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>Phòng {item.room}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ alignItems: "center" }}>
          <Text>STT của bạn</Text>
          <Text style={{ color: "blue", fontSize: 30 }}>{item.number}</Text>
        </View>
        {item.state === NUMBER_STATE.NOT_USE && (
          <View style={{ alignItems: "center" }}>
            <Text>STT đang khám</Text>
            <Text style={{ color: "orange", fontSize: 30 }}>{current}</Text>
          </View>
        )}
      </View>
      <Text style={{ fontStyle: "italic" }}>
        Ngày khám: {new Date(item.date).toLocaleDateString()}
      </Text>
      <View style={{ flexDirection: "row-reverse" }}>
        {item.state === NUMBER_STATE.NOT_USE && (
          <Button
            color="red"
            title="Hủy"
            onPress={async () => {
              await cancel(item.id)
                .then((res) => console.log(res.message))
                .catch((err) => console.error(err));
              load();
            }}
          />
        )}
        {item.state === NUMBER_STATE.USED && (
          <Text style={{ color: "green" }}>Đã sử dụng</Text>
        )}
        {item.state === NUMBER_STATE.CANCEL && (
          <Text style={{ color: "red" }}>Đã hủy</Text>
        )}
        {item.state === NUMBER_STATE.EXPIRED && (
          <Text style={{ color: "orange" }}>Hết hạn</Text>
        )}
      </View>
    </View>
  );
}
