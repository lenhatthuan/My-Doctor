import React, {useState, useEffect} from 'react';
import {LineChart, Grid, YAxis} from 'react-native-svg-charts';
import {Text, View, Alert} from 'react-native';
import {Agenda} from 'react-native-calendars';
// import {formatDateCalandar} from '../../util/string-format';
import BmiItem from '../../components/healthy/bmi/BmiItem';
// import {getAllBMI, deleteBMI} from '../../store/actions/bmi';
import {styles} from '../../theme/chart';

// import {styles} from '../../theme/chart';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Bmi = props => {
  const [chart, setChart] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    AsyncStorage.getItem('accountData').then(res => {
      const account = JSON.parse(res);
      getAllBMI(account.accountId)
        .then(data => {
          setChart(formatChart(data));
          setList(formatList(data));
        })
        .catch(err => console.log(err));
    });
  }, [list]);

  const formatList = array => {
    const item = {};
    array.forEach(
      element =>
        (item[formatDateCalandar(element.createdAt)] = [
          {id: element.id, tall: element.tall, weight: element.weigh},
        ]),
    );
    return item;
  };

  const formatChart = array =>
    array.map(element => element.weigh / ((element.tall / 100) * 2));

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Biểu đồ</Text>
      <View style={styles.chart}>
        <YAxis svg={{fill: 'grey'}} data={chart} />
        <LineChart style={{flex: 1}} data={chart} svg={{stroke: 'blue'}}>
          <Grid />
        </LineChart>
      </View>
      <Text style={[styles.title, {marginTop: 10}]}>Lịch sử đo</Text>
      <Agenda
        items={list}
        selected={new Date()}
        renderItem={item => (
          <BmiItem
            item={item}
            remove={() =>
              Alert.alert('Bạn có chắc muốn xóa?', '', [
                {
                  text: 'Có',
                  onPress: () =>
                    deleteBMI(item.id)
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

export default Bmi;
