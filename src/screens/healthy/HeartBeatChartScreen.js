import React, {useState, useEffect} from 'react';
// import { BarChart, Grid, YAxis, LineChart } from "react-native-svg-charts";
import {Text, View, Button} from 'react-native';
// import { getAllHeart } from "../../store/actions/heart";
// import { styles } from "../../theme/chart";

const HeartBeatChart = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('accountData').then(res => {
      const account = JSON.parse(res);
      getAllHeart(account.accountId)
        .then(data => setData(data))
        .catch(err => console.log(err));
    });
  }, []);

  const barData = [
    {data: data.map(element => element.diastole), svg: {fill: 'blue'}},
    {data: data.map(element => element.systole), svg: {fill: 'red'}},
  ];

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Huyết áp</Text>
      <View style={styles.chart}>
        {/* <YAxis
          svg={{fill: 'grey'}}
          data={data.map(element => [element.diastole, element.systole]).flat()}
        />
        <BarChart style={{flex: 1}} data={barData}>
          <Grid />
        </BarChart> */}
      </View>
      <Text style={[styles.title, {marginTop: 10}]}>Nhịp tim</Text>
      <View style={[styles.chart, {marginBottom: 10}]}>
        {/* <YAxis
          svg={{fill: 'grey'}}
          data={data.map(element => element.heartBeat)}
        />
        <LineChart
          style={{flex: 1}}
          data={data.map(element => element.heartBeat)}
          svg={{stroke: 'blue'}}>
          <Grid />
        </LineChart> */}
      </View>
      <Button
        title="Lịch sử đo"
        onPress={() => props.navigation.push('HeartBeat')}
      />
    </View>
  );
};
export default HeartBeatChart;
