import React, {useState, useEffect} from 'react';
import {BarChart, Grid, YAxis, LineChart} from 'react-native-svg-charts';
import {Text, View, Button, StyleSheet} from 'react-native';
import {getAllHeart} from '../../../../store/actions/heart';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <YAxis
          svg={{fill: 'grey'}}
          data={data.map(element => [element.diastole, element.systole]).flat()}
        />
        <BarChart style={{flex: 1}} data={barData}>
          <Grid />
        </BarChart>
      </View>
      <Text style={[styles.title, {marginTop: 10}]}>Nhịp tim</Text>
      <View style={[styles.chart, {marginBottom: 10}]}>
        <YAxis
          svg={{fill: 'grey'}}
          data={data.map(element => element.heartBeat)}
        />
        <LineChart
          style={{flex: 1}}
          data={data.map(element => element.heartBeat)}
          svg={{stroke: 'blue'}}>
          <Grid />
        </LineChart>
      </View>
      <Button
        title="Lịch sử đo"
        onPress={() => props.navigation.push('ListHeart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  chart: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    flex: 3,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
  },
});

export default HeartBeatChart;
