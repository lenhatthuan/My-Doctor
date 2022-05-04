import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../../../assets/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getAllScheduleByDoctorId} from '../../../store/actions/schedule';
import {formatDate} from '../../../utils/string-format';
import {getAll} from '../../../store/actions/room';
import {getAllByPatientIdAndDoctorId} from '../../../store/actions/doctor-registration';
import ServiceComponent from '../../../components/service/ServiceComponent';
import {getAllByDoctorId} from '../../../store/actions/service';
import AddCalandarComponent from '../../../components/common/AddCalandarComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorAlert from '../../../components/common/ErrorAlertComponent';
export default function DoctorProfile({route, navigation}) {
  const [filter, setFilter] = useState(false);
  const [getListFilter, setGetListFilter] = useState(false);
  const [listSchedule, setListSchedule] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [listService, setListService] = useState([]);
  const {doctor} = route.params;
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isExist, setIsExist] = React.useState(false);

  useEffect(() => {
    getListService();
    return () => {};
  }, []);

  const getListService = () => {
    setIsLoading(true);
    getAllByDoctorId(doctor.id).then(res => {
      setIsLoading(false);
      if (res) setListService(res);
    });
  };

  let priceTemp = 0;
  const setPriceService = p => {
    setPrice(p);
    priceTemp = p;
  };

  let registration = {};
  const setRegistration = res => {
    registration = res;
  };
  const gotoPayment = () => {
    navigation.navigate('payment', {
      price: priceTemp,
      registration: registration,
    });
  };

  const gotoChat = () => {
    AsyncStorage.getItem('id').then(userId => {
      getAllByPatientIdAndDoctorId(userId, doctor.id).then(res => {
        if (res) {
          navigation.navigate('ChatDetailScreen', {
            doctor: doctor,
            userId: userId,
          });
        } else setIsExist(true);
      });
    });
  };

  const cancelExistAlert = () => {
    setIsExist(false);
  };

  const renderService = ({item}) => {
    return (
      <ServiceComponent
        name={item.name}
        description={item.description}
        price={item.price}
        serviceId={item.id}
        duration={item.duration}
        doctorId={item.doctorId}
        setPrice={setPriceService}
        setRegistration={setRegistration}
        gotoPayment={gotoPayment}
        nameDoctor={doctor.fullname}
      />
    );
  };

  const getMonth = () => {
    return new Date().getMonth() + 1;
  };

  const getNextMonth = date => {
    let year = getYear();
    let month = getMonth();
    if (month == 12) {
      year = year + 1;
      month = 1;
    } else month = month + 1;
    return year + '-' + '01' + '-' + date;
  };

  const getYear = () => {
    return new Date().getFullYear();
  };

  const getDate = date => {
    let month = getMonth();
    if (month >= 10) return getYear() + '-' + getMonth() + '-' + date;
    else return getYear() + '-' + '0' + getMonth() + '-' + date;
  };

  const setListDate = schedule => {
    let list = [];
    schedule.forEach(date => {
      if (date.day <= 31) list.push(getDate(date.day));
    });

    if (new Date().getDate() > 15) {
      schedule.forEach(date => {
        if (date.day <= 31) list.push(getNextMonth(date.day));
      });
    }
    return list;
  };

  const openCalendar = () => {
    getAllScheduleByDoctorId(doctor.id).then(res => {
      if (res) {
        setListSchedule(res);
        setListDate(res);
      }

      getAll().then(res => {
        if (res) setListRoom(res);

        setFilter(true);
      });
    });
  };

  const cancelOpenCalendar = () => {
    setFilter(false);
  };

  const callbackFunction = async date => {
    getScheduleByDateAndDoctor(date);
    cancelOpenCalendar();
  };

  const getDayCalandar = date => {
    return date.substring(8, 10);
  };

  const getScheduleByDateAndDoctor = async date => {
    let lSchedule = [];
    listSchedule.forEach(item => {
      if (item.day == getDayCalandar(date)) {
        lSchedule.push(item);
      }
    });

    if (lSchedule.length > 0 && listRoom.length > 0) {
      navigation.navigate('DoctorSchedule', {
        schedule: lSchedule,
        room: listRoom,
        doctor: doctor,
        date: formatDate(date),
      });
    } else {
      alert('Hiện ngày chọn không có lịch khám của bác sĩ này!');
    }
  };

  const onCancelFitler = () => {
    setFilter(false);
  };

  const getFilter = () => {
    setGetListFilter(true);
  };

  const imageBanner = require('../../../../assets/imgs/banner-profile.png');
  const animatedButtonScale = new Animated.Value(1);

  const animatedButtonScaleBtn = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressInBtn = () => {
    Animated.spring(animatedButtonScaleBtn, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const onPressOutBtn = () => {
    Animated.spring(animatedButtonScaleBtn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };

  const animatedScaleStyleBtn = {
    transform: [{scale: animatedButtonScaleBtn}],
  };

  return (
    <>
      <ErrorAlert
        visible={isExist}
        message="Bác sĩ này, bạn chưa đăng kí, vui lòng đăng ký để được tư vấn trực tiếp!"
        onCancel={cancelExistAlert}
      />
      <View style={styles.screen}>
        <View style={styles.bodyScreen}>
          <View style={styles.profileBody}>
            <Image source={imageBanner} style={styles.banner} />
            <View style={styles.avatarContainer}>
              <Image style={styles.imgProfile} source={{uri: doctor.avatar}} />
            </View>
            <View style={styles.information}>
              <Text style={styles.txtName}>{doctor.fullname}</Text>
              <Text style={styles.txtPosition}>
                Chuyên khoa {doctor.department}
              </Text>
            </View>
            <View style={styles.body}>
              <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Feather name="phone" size={20} color="#FF5151" />
                  <Text style={styles.txtBody}>{doctor.phone}</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="school-outline" size={20} color="#FF5151" />
                  <Text style={styles.txtBody}>{doctor.education}</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  key="2"
                  onPress={() => {
                    gotoChat();
                  }}
                  onPressIn={onPressInBtn}
                  onPressOut={onPressOutBtn}
                  //  style = {styles.btnAction}
                >
                  <Animated.View
                    style={[styles.btnActionBtn, animatedScaleStyleBtn]}>
                    <AntDesign name="message1" size={15} color="white" />
                    <Text
                      style={{
                        paddingLeft: 3,
                        color: 'white',
                        fontWeight: '500',
                        fontSize: 15,
                      }}>
                      Tư vấn
                    </Text>
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                  key="1"
                  onPress={() => {
                    console.log('dat lich nha!');
                    openCalendar();
                  }}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  //   style = {styles.btnAction}
                >
                  <Animated.View style={[styles.btnAction, animatedScaleStyle]}>
                    <Ionicons name="calendar-outline" size={15} color="white" />
                    <Text
                      style={{
                        paddingLeft: 3,
                        color: 'white',
                        fontWeight: '500',
                        fontSize: 15,
                      }}>
                      Đặt lịch
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 50, padding: 10}}>
              <Text style={{fontWeight: 'bold', marginLeft: 10}}>Dịch vụ</Text>
              <View>
                {isLoading == true ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      width: '100%',
                      alignContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Image
                      source={require('../../../../assets/imgs/loadComponent.gif')}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                ) : null}
                {listService.length == 0 && isLoading == false ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      width: '100%',
                      alignContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#000957',
                      }}>
                      Không có dịch vụ cho bác sĩ này
                    </Text>
                  </View>
                ) : null}
                <FlatList
                  data={listService}
                  renderItem={renderService}></FlatList>
              </View>
            </View>
          </View>
        </View>
      </View>
      <AddCalandarComponent
        visible={filter}
        onCancel={cancelOpenCalendar}
        setDateFilter={callbackFunction}
        onPress={getFilter}
        onCancelFilter={onCancelFitler}
        listDate={setListDate(listSchedule)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    top: 20,
  },

  btnActionBtn: {
    borderRadius: 25,
    backgroundColor: COLORS.TeaGreen,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  btnAction: {
    borderRadius: 25,
    backgroundColor: COLORS.TeaGreen,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  bodyScreen: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  profileBody: {
    borderRadius: 21,
    elevation: 3,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },

  txtBody: {
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 3,
    paddingLeft: 5,
  },

  infoBanner: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 5,
  },

  txtNameView: {
    flex: 1,
  },

  txtName: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 20,
  },

  txtPosition: {
    color: '#9597A1',
    marginTop: 5,
  },

  information: {
    // justifyContent:'flex-start',
    // flexDirection:'column',
    // position:'absolute',
    top: 10,
    justifyContent: 'flex-start',
    marginLeft: 30,
    alignItems: 'center',
  },

  body: {
    // elevation: 3,
    top: 20,
    paddingLeft: 20,
  },

  avatarContainer: {
    height: 100,
    width: 100,
    // alignSelf: "center",
    marginLeft: 15,
    position: 'absolute',
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  imgProfile: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },

  banner: {
    height: 100,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  screen: {
    flex: 1,
  },
});
