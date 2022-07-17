import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getRecordByPatient } from '../../store/actions/record';
import RecordItem from '../../components/record/RecordItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timeline from 'react-native-timeline-flatlist';
import { getAll, getDoctor } from '../../store/actions/doctor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemDetail from './components/ItemDetail';
import { formatDateYear } from '../../utils/string-format';
const Record = props => {
  const [data, setData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorFirst, setDoctorFirst] = useState();

  const getDoctorByDoctorId = doctorId => {
    getDoctor(doctorId).then(res => setDoctorFirst(res));
  };
  const gotoMedical = useCallback(record => {
    props.navigation.navigate('Prescription', { record: record });
  }, []);
  const renderTime = (rowData, sectionID, rowID) => {
    return (
      <View style={styles.renderTime}>
        <Text style={styles.timeStyle}>
          {formatDateYear(rowData.createdAt)}
        </Text>
      </View>
    );
  };
  const renderDetail = (rowData, sectionID, rowID) => {
    return (
      <ItemDetail
        rowData={rowData}
        sectionID={sectionID}
        rowID={rowID}
        gotoMedical={gotoMedical}
      />
    );
  };

  useEffect(() => {
    getAll().then(lDoctor => {
      setDoctors(lDoctor);

      AsyncStorage.getItem('patientData').then(res => {
        getRecordByPatient(JSON.parse(res).patientId)
          .then(result => {
            let list = result.sort(function (x, y) {
              return new Date(y.createdAt) - new Date(x.createdAt);
            });
            console.log({ list });
            setData(list);
            getDoctorByDoctorId(list[0]?.doctorId);
          })
          .catch(err => console.error(err));
      });
    });
  }, []);
  const onPressBack = useCallback(() => {
    props.navigation.goBack();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Ionicons
          onPress={onPressBack}
          name={'chevron-back'}
          size={24}
          color={'black'}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hồ sơ bệnh án</Text>

        <View style={styles.infoContainer}>
          {data ? (
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageHeathy}
                source={require('../../../assets/imgs/card_heathy.png')}></Image>
              <View style={styles.infoImageHeathyContainer}>
                <View style={styles.txtInfoContainer}>
                  <Text style={styles.txtInfo}>Lần khám gần đây nhất!</Text>
                </View>
                <View style={styles.txtInfoContainer}>
                  <MaterialCommunityIcons name="format-quote-open" size={24} />
                  <Text style={styles.txtInfo}>
                    {' '}
                    {data[0]?.commentByDoctor ?? 'Không có nhắc nhở đặc biệt!'}
                  </Text>
                </View>
                <View style={styles.txtInfoDoctorContainer}>
                  <Text style={styles.txtDoctorInfo}>
                    BS.{doctorFirst?.fullname ?? 'Không hiển thị tên bác sĩ'}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageHeathy}
                source={require('../../../assets/imgs/card_heathy.png')}></Image>
              <View style={styles.infoImageHeathyContainer}>
                <View style={styles.txtInfoContainer}>
                  <MaterialCommunityIcons name="format-quote-open" size={24} />
                  <Text style={styles.txtInfo}>
                    “ Bạn chưa đi khám bệnh lần nào á hihi, hy vọng bạn luôn
                    khỏe mạnh như vậy nhé!!
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.infoSickContainer}></View>
        </View>
        <Text style={styles.title}>--------</Text>

        {data ? (
          <>
            <Timeline
              //..other props
              data={data}
              renderTime={renderTime}
              renderDetail={renderDetail}
              dotSize={10}
              circleSize={15}
              circleColor="#1F9BAD"
              lineColor="#65DFED"
              innerCircle={'dot'}
              options={{
                style: { paddingTop: 5 },
              }}
            />
            {/* <Text style={styles.title}>Các đơn thuốc</Text>
            {data.map(item => (
              <RecordItem
                key={item.id}
                item={item}
                onPress={id =>
                  props.navigation.navigate('Prescription', {recordId: id})
                }
              />
            ))} */}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  renderTime: {
    backgroundColor: '#65DFED',
    padding: 5,
    borderRadius: 5,
    marginLeft: 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeStyle: {
    textAlign: 'center',
    color: 'white',
  },
  header: {
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  onPressMecialContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnMedicalContainer: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  txtBtnMedical: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#754090',
  },
  txtCmtDetailContainer: { flexDirection: 'row', flex: 1 },
  txtCmtByDoctor: {},
  infoSickDetailContainer: {
    marginVertical: 3,
    flex: 1,
  },
  txtDetailContainer: {
    marginVertical: 3,
  },
  imgDoctorContainer: {
    paddingHorizontal: 3,
  },
  imgDoctor: {
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  infoDetailContainer: {
    flexDirection: 'row',
  },
  txtNameSick: { fontWeight: 'bold', color: '#6CC4A1', fontSize: 14 },
  txtNameDoctorSick: { fontWeight: 'bold', color: 'black', fontSize: 14 },
  title: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 15,
    color: '#377D71',
    fontWeight: 'bold',
  },
  txtDoctorInfo: {
    fontSize: 12,
    color: 'white',
  },
  txtInfoContainer: {
    marginVertical: 3,
    flexDirection: 'row',
  },
  txtInfoDoctorContainer: {
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  infoContainer: {},
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeathy: {
    height: 180,
    width: 320,
    borderRadius: 4,
  },
  txtInfo: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },

  infoImageHeathyContainer: {
    height: 180,
    width: 320,
    borderRadius: 4,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 20,
  },
});
export default Record;
