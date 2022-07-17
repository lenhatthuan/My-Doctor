import React, {useState, useEffect, useCallback} from 'react';
import {BarChart, Grid, YAxis, LineChart, XAxis} from 'react-native-svg-charts';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {getAllHeart} from '../../../../store/actions/heart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BtnAddComponent from '../../BtnAddComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BtnChoose from '../BtnChoose';
import {formatDate} from '../../../../utils/string-format';
const DAY_CHOOSE = {
  ONE_DAY: 1,
  SEVEN_DAY: 7,
  THIRTY_DAY: 30,
};

const HeartBeatChart = props => {
  const [data, setData] = useState([]);
  const [dataChartColunm, setDataChartColunm] = useState([]);
  const [dataChartHeart, setDataChartHeart] = useState([]);
  const [isDayHA, setIsDayHA] = useState(DAY_CHOOSE.ONE_DAY); // 1: 1 day, 7: day,
  const [isDayHeart, setIsDayHeart] = useState(DAY_CHOOSE.ONE_DAY); // 1: 1 day, 7: day,
  const [txtChartHA, setTextChartHA] = useState('');
  const [txtChartHeart, setTextChartHeart] = useState('');
  const getMouthByformatDate = fDate => {
    return formatDate(fDate).slice(3, 5);
  };
  const getDayByformatDate = fDate => {
    return formatDate(fDate).slice(0, 2);
  };
  const getYearByformatDate = fDate => {
    return formatDate(fDate).slice(6, 11);
  };

  useEffect(() => {
    setIsDayHA(DAY_CHOOSE.ONE_DAY);
    setIsDayHeart(DAY_CHOOSE.ONE_DAY);
    AsyncStorage.getItem('accountData').then(res => {
      const account = JSON.parse(res);
      getAllHeart(account.accountId)
        .then(data => {
          setData(data);
          getToDayHAFirst(data);
          getToDayHeartFrist(data);
        })
        .catch(err => console.log(err));
    });
  }, []);

  const getToDayHAFirst = dataNew => {
    let date = Date.now();
    let list = [];
    dataNew?.forEach(item => {
      if (formatDate(item.createdAt) == formatDate(date)) {
        list = [...list, item];
      }
    });
    setDataChartColunm(list);
  };

  const getToDayHA = () => {
    let date = Date.now();
    let list = [];
    data?.forEach(item => {
      if (formatDate(item.createdAt) == formatDate(date)) {
        list = [...list, item];
      }
    });
    setDataChartColunm(list);
  };

  const getToSevenDayHA = () => {
    //  let day = getDayByformatDate(Date.now());
    let date = new Date();
    let list = [];
    data?.forEach(item => {
      let dateTest = new Date(item.createdAt);
      if (
        date.getDate() - dateTest.getDate() < 7 &&
        date.getDate() - dateTest.getDate() >= 0
      ) {
        list = [...list, item];
      }
    });

    setDataChartColunm(
      list.sort(function (x, y) {
        return new Date(x.createdAt) - new Date(y.createdAt);
      }),
    );
  };

  const getToThirtyDayHA = () => {
    let date = new Date();
    let list = [];
    data?.forEach(item => {
      let dateTest = new Date(item.createdAt);
      if (getYearByformatDate(date) == getYearByformatDate(dateTest)) {
        if (getMouthByformatDate(date) == getMouthByformatDate(dateTest)) {
          list = [...list, item];
        }
      }
    });

    setDataChartColunm(
      list.sort(function (x, y) {
        return new Date(x.createdAt) - new Date(y.createdAt);
      }),
    );
  };

  const getToDayHeartFrist = dataNew => {
    let date = Date.now();
    let list = [];
    dataNew?.forEach(item => {
      if (formatDate(item.createdAt) == formatDate(date)) {
        list = [...list, item];
      }
    });
    setDataChartHeart(list);
  };

  const getToDayHeart = () => {
    let date = Date.now();
    let list = [];
    data?.forEach(item => {
      if (formatDate(item.createdAt) == formatDate(date)) {
        list = [...list, item];
      }
    });
    setDataChartHeart(list);
  };

  const getToSevenDayHeart = () => {
    let date = new Date();
    let list = [];
    data?.forEach(item => {
      let dateTest = new Date(item.createdAt);
      if (
        date.getDate() - dateTest.getDate() < 7 &&
        date.getDate() - dateTest.getDate() >= 0
      ) {
        list = [...list, item];
      }
    });

    setDataChartHeart(
      list.sort(function (x, y) {
        return new Date(x.createdAt) - new Date(y.createdAt);
      }),
    );
  };

  const getToThirtyDayHeart = () => {
    let date = new Date();
    let list = [];
    data?.forEach(item => {
      let dateTest = new Date(item.createdAt);
      if (getYearByformatDate(date) == getYearByformatDate(dateTest)) {
        if (getMouthByformatDate(date) == getMouthByformatDate(dateTest)) {
          list = [...list, item];
        }
      }
    });

    setDataChartHeart(
      list.sort(function (x, y) {
        return new Date(x.createdAt) - new Date(y.createdAt);
      }),
    );
  };

  const barData = [
    {
      data: dataChartColunm?.map(element => element.diastole),
      svg: {fill: '#6CC4A1'},
    },
    {
      data: dataChartColunm?.map(element => element.systole),
      svg: {fill: '#4CACBC'},
    },
  ];

  const onPressBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const onPressOneDayHA = useCallback(() => {
    setIsDayHA(DAY_CHOOSE.ONE_DAY);
    getToDayHA();
  }, [data, dataChartColunm, isDayHA]);
  const onPress7DayHA = useCallback(() => {
    setIsDayHA(DAY_CHOOSE.SEVEN_DAY);
    getToSevenDayHA();
  }, [data, dataChartColunm, isDayHA]);
  const onPress30DayHA = useCallback(() => {
    setIsDayHA(DAY_CHOOSE.THIRTY_DAY);
    getToThirtyDayHA();
  }, [data, dataChartColunm, isDayHA]);

  const onPressOneDayHeart = useCallback(() => {
    setIsDayHeart(DAY_CHOOSE.ONE_DAY);
    getToDayHeart();
  }, [data, dataChartHeart, isDayHeart]);
  const onPress7DayHeart = useCallback(() => {
    setIsDayHeart(DAY_CHOOSE.SEVEN_DAY);
    getToSevenDayHeart();
  }, [data, dataChartHeart, isDayHeart]);
  const onPress30DayHeart = useCallback(() => {
    setIsDayHeart(DAY_CHOOSE.THIRTY_DAY);
    getToThirtyDayHeart();
  }, [data, dataChartHeart, isDayHeart]);

  return (
    <View style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons
            onPress={onPressBack}
            name={'chevron-back'}
            size={24}
            color={'black'}
          />
        </View>
        <Text style={styles.title}>Biểu đồ huyết áp </Text>
        <View style={styles.btnActionContainer}>
          <View style={styles.actionContainer}>
            <BtnChoose
              title={'Ngày'}
              onPress={onPressOneDayHA}
              isChoose={isDayHA === DAY_CHOOSE.ONE_DAY}
            />
          </View>
          <View style={styles.actionContainer}>
            <BtnChoose
              title={'7 Ngày'}
              onPress={onPress7DayHA}
              isChoose={isDayHA === DAY_CHOOSE.SEVEN_DAY}
            />
          </View>
          <View style={styles.actionContainer}>
            <BtnChoose
              title={'Tháng'}
              onPress={onPress30DayHA}
              isChoose={isDayHA === DAY_CHOOSE.THIRTY_DAY}
            />
          </View>
        </View>
        <View style={styles.chart}>
          {dataChartColunm?.length > 0 ? (
            <>
              <YAxis
                min={0}
                svg={{fill: 'grey'}}
                data={dataChartColunm
                  ?.map(element => [element.diastole, element.systole])
                  .flat()}
              />
              <BarChart style={{flex: 1}} data={barData}>
                <Grid />
              </BarChart>
            </>
          ) : (
            <>
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataTxt}>
                  Bạn chưa có dữ liệu, nhớ thực hiện đo nhịp tim và huyết áp
                  nhé!
                </Text>
              </View>
            </>
          )}
        </View>
        <Text style={[styles.title, {marginTop: 10}]}>Sơ đồ nhịp tim</Text>

        <View style={styles.btnActionContainer}>
          <View style={styles.actionContainer}>
            <BtnChoose
              title={'Ngày'}
              onPress={onPressOneDayHeart}
              isChoose={isDayHeart === DAY_CHOOSE.ONE_DAY}
            />
          </View>
          <View style={styles.actionContainer}>
            <BtnChoose
              title={'7 Ngày'}
              onPress={onPress7DayHeart}
              isChoose={isDayHeart === DAY_CHOOSE.SEVEN_DAY}
            />
          </View>
          <View style={styles.actionContainer}>
            <BtnChoose
              title={'Tháng'}
              onPress={onPress30DayHeart}
              isChoose={isDayHeart === DAY_CHOOSE.THIRTY_DAY}
            />
          </View>
        </View>
        <View style={[styles.chart, {marginBottom: 10}]}>
          {dataChartHeart?.length > 0 ? (
            <>
              <YAxis
                min={0}
                svg={{fill: 'grey'}}
                data={dataChartHeart?.map(element => element.heartBeat)}
              />
              <LineChart
                style={{flex: 1}}
                data={dataChartHeart?.map(element => element.heartBeat)}
                svg={{stroke: '#D61C4E', strokeWidth: 2}}>
                <Grid />
              </LineChart>

              <YAxis
                svg={{fill: 'grey'}}
                data={dataChartHeart?.map(element => element.heartBeat)}
              />
            </>
          ) : (
            <>
              <View style={styles.noDataContainer}>
                <Text style={styles.noDataTxt}>
                  Bạn chưa có dữ liệu, nhớ thực hiện đo nhịp tim và huyết áp
                  nhé!
                </Text>
              </View>
            </>
          )}
        </View>
        <BtnAddComponent
          title="Lịch sử đo"
          onPress={() => props.navigation.push('ListHeart')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataTxt: {fontWeight: 'bold', fontSize: 14, textAlign: 'center'},
  noDataContainer: {
    backgroundColor: '#C4DFAA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActionContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  header: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  main: {
    flex: 1,
    margin: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  chart: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    height: 300,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
  },
});

export default HeartBeatChart;
