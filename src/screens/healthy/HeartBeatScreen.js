import React, { useState, useEffect } from "react";
import { Text, View, Alert, AsyncStorage } from "react-native";
import { Agenda } from "react-native-calendars";
import { Icon } from "react-native-elements";
import { formatDateCalandar, formatTime } from "../../utils/string-format";
import HeartBeatComponent from "../../components/healthy/heartbeat/HeartBeatComponent";
import { getAllHeart, deleteHeartBeat } from "../../store/actions/heart";
import { LocalConfig } from "../../config/calendar";
import { styles } from "../../theme/chart";

export default function HeartBeatScreen(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("accountData").then((res) => {
      const account = JSON.parse(res);
      getAllHeart(account.accountId)
        .then((data) => setData(format(data)))
        .catch((err) => console.log(err));
    });
  }, [data]);

  const format = (array) => {
    const item = {};
    array.forEach((element) => {
      const date = formatDateCalandar(element.createdAt);
       if (!item.[date])  item.[date]=[];
      item.[date].push({id:element.id, diastole:element.diastole,systole: element.systole, heartbeat: element.heartBeat, time:formatTime(element.createdAt)})
    });
    return item;
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Lịch sử đo</Text>
      <Agenda
        items={data}
        selected={new Date()}
        renderItem={(item) => (
          <HeartBeatComponent
            item={item}
            remove={() =>
              Alert.alert("Bạn có chắc muốn xóa?", "", [
                {
                  text: "Có",
                  onPress: () =>
                    deleteHeartBeat(item.id)
                      .then((res) => console.log(res))
                      .catch((err) => console.log(err)),
                },
                { text: "Không" },
              ])
            }
          />
        )}
        showClosingKnob={true}
      />
    </View>
  );
}
