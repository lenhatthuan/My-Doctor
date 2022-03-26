import React, {useState, useEffect} from 'react';
import { AreaChart, Grid } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import {Text, View, Alert} from 'react-native';
import {Agenda} from 'react-native-calendars';
// import { formatDateCalandar, formatTime } from "../../utils/string-format";
import EmotionItem from '../../components/healthy/emotion/EmtionItem';
// import { getAll, remove } from "../../store/actions/emotion";
import {styles} from '../../theme/chart';
import emotion from '../../config/emotion';
import calendar from '../../config/calendar';

const Emotion = props => {
  const [chart, setChart] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('accountData').then(res => {
      const account = JSON.parse(res);
      getAll(account.accountId)
        .then(data => {
          setChart(formatChart(data));
          setList(formatList(data));
        })
        .catch(err => console.log(err));
    });
  }, [list]);

  const formatList = array => {
    const item = {};
    array.forEach(element => {
      const date = formatDateCalandar(element.createdAt);
      let emotion = {};
      for (const key in emotion) {
        if (element.emotion === emotion[key].text) emotion = emotion[key];
      }
      if (!item[date]) item[date] = [];
      item[date].push({
        id: element.id,
        emotion: emotion,
        content: element.description,
        time: formatTime(element.createdAt),
      });
    });
    return item;
  };

  const Gradient = ({index}) => (
    <Defs key={index}>
      <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={0.25} stopColor={'blue'} />
        <Stop offset={0.5} stopColor={'blue'} stopOpacity={0.5} />
        <Stop offset={0.75} stopColor={'red'} stopOpacity={0.5} />
        <Stop offset={1} stopColor={'red'} />
      </LinearGradient>
    </Defs>
  );

  const formatChart = array => {
    const item = [];
    array.forEach(element => {
      for (const key in emotion) {
        if (element.emotion === emotion[key].text)
          item.push(emotion[key].value);
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
        svg={{fill: 'url(#gradient)'}}
        gridMax={2}
        gridMin={-2}>
        <Gradient />
        <Grid />
      </AreaChart>
      <Text style={[styles.title, {marginTop: 10}]}>Lịch sử</Text>
      <Agenda
        loc
        items={list}
        selected={new Date()}
        renderItem={item => (
          <EmotionItem
            item={item}
            remove={() =>
              Alert.alert('Bạn có chắc muốn xóa?', '', [
                {
                  text: 'Có',
                  onPress: () =>
                    remove(item.id)
                      .then(res => console.log(res))
                      .catch(err => console.log(err)),
                },
                {text: 'Không'},
              ])
            }
          />
        )}
        showClosingKnob={true}
      />
    </View>
  );
};
export default Emotion;
