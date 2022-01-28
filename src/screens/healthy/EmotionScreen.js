import React, { useState, useEffect } from "react";
import { AreaChart, Grid } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { Text, View, Alert, AsyncStorage } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Icon } from "react-native-elements";
import { EMOTION } from "../../constant";
import { formatDateCalandar, formatTime } from "../../utils/string-format";
import EmotionComponent from "../../components/healthy/emotion/EmotionComponent";
import { getAll, remove } from "../../store/actions/emotion";
import { LocalConfig } from "../../config/calendar";
import { styles } from "../../theme/chart";

export default function EmotionScreen(props) {
  const [chart, setChart] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("accountData").then((res) => {
      const account = JSON.parse(res);
      getAll(account.accountId)
        .then((data) => {
          setChart(formatChart(data));
          setList(formatList(data));
        })
        .catch((err) => console.log(err));
    });
  }, [list]);

  const formatList = (array) => {
    const item = {};
    array.forEach((element) => {
      const date = formatDateCalandar(element.createdAt);
      let emotion = {};
      for (const key in EMOTION) {
        if (element.emotion === EMOTION[key].text) emotion = EMOTION[key];
      }
       if (!item.[date])  item.[date]=[];
      item.[date].push({id:element.id, emotion:emotion,content: element.description, time:formatTime(element.createdAt)})
    });
    return item;
  };

  const Gradient = ({ index }) => (
    <Defs key={index}>
      <LinearGradient id={"gradient"} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={0.25} stopColor={"blue"} />
        <Stop offset={0.5} stopColor={"blue"} stopOpacity={0.5} />
        <Stop offset={0.75} stopColor={"red"} stopOpacity={0.5} />
        <Stop offset={1} stopColor={"red"} />
      </LinearGradient>
    </Defs>
  );

  const formatChart = (array) => {
    const item = [];
    array.forEach((element) => {
      for (const key in EMOTION) {
        if (element.emotion === EMOTION[key].text)
          item.push(EMOTION[key].value);
      }
    });
    return item;
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Biểu đồ</Text>
      <AreaChart
        style={styles.chart}
        data={chart}
        svg={{ fill: "url(#gradient)" }}
        gridMax={2}
        gridMin={-2}
      >
        <Gradient />
        <Grid />
      </AreaChart>
      <Text style={[styles.title, { marginTop: 10 }]}>Lịch sử</Text>
      <Agenda
        items={list}
        selected={new Date()}
        renderItem={(item) => (
          <EmotionComponent
            item={item}
            remove={() =>
              Alert.alert("Bạn có chắc muốn xóa?", "", [
                {
                  text: "Có",
                  onPress: () =>
                    remove(item.id)
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
