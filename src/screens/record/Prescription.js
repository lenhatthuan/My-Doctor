import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {getByRecord} from '../../store/actions/prescription';
import {Icon, Overlay} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Prescription = props => {
  const [prescription, setPrescription] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();

  useEffect(() => {
    getByRecord(props.route.params.recordId)
      .then(result => setPrescription(result.prescription))
      .catch(err => console.error(err));
  }, []);

  const onPressBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Ionicons
          onPress={onPressBack}
          name={'chevron-back'}
          size={24}
          color={'black'}
        />
      </View>
      <ImageBackground
        source={require('../../assets/record.png')}
        style={[
          styles.containerList,
          {paddingVertical: 20, paddingHorizontal: 10},
        ]}>
        <View style={{opacity: 1}}>
          <Text style={styles.title}>Đơn thuốc</Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              paddingTop: 20,
              paddingBottom: 40,
            }}>
            <DataTable style={{backgroundColor: 'white'}}>
              <DataTable.Header>
                <DataTable.Title style={{flex: 1}}>
                  <Text style={styles.txtMedicalHeader}>#</Text>
                </DataTable.Title>
                <DataTable.Title style={{flex: 3}}>
                  <Text style={styles.txtMedicalHeader}>Tên thuốc</Text>
                </DataTable.Title>
                <DataTable.Title style={{flex: 2}}>
                  <Text style={styles.txtMedicalHeader}>Liều </Text>
                </DataTable.Title>
                <DataTable.Title style={{flex: 4, justifyContent: 'center'}}>
                  <Text style={styles.txtMedicalHeader}>Cách dùng</Text>
                </DataTable.Title>
              </DataTable.Header>
              {prescription.map((medicine, index) => (
                <DataTable.Row>
                  <DataTable.Cell style={{flex: 1}}>
                    <Text style={styles.txtMedical}>{++index}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 3}}>
                    <Text style={styles.txtMedical}>{medicine.name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={styles.txtMedical}>{medicine.amount}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 4}}>
                    <Text style={styles.txtMedical}>{medicine.use}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
          <Overlay
            overlayStyle={{
              borderRadius: 5,
              paddingHorizontal: 100,
              paddingVertical: 20,
            }}
            isVisible={isVisible}
            onBackdropPress={() => {
              setHour(null);
              setMinute(null);
              setIsVisible(false);
            }}>
            <Text style={styles.txtAlarm}>Nhắc uống thuốc</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TextInput
                placeholder="hh"
                onChangeText={text => {
                  const hours = parseInt(text);
                  hours >= 0 && hours < 24 ? setHour(hours) : setHour(null);
                }}
                maxLength={2}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="mm"
                onChangeText={text => {
                  const minutes = parseInt(text);
                  minutes >= 0 && minutes < 60
                    ? setMinute(minutes)
                    : setMinute(null);
                }}
                maxLength={2}
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Đặt giờ"
              disabled={hour == null || minute == null}
              onPress={() => {
                let date = new Date();
                date.setHours(hour, minute, 0, 0);
                PushNotification.localNotificationSchedule({
                  date: date,
                  title: 'Nhắc uống thuốc',
                  channelId: 'channel',
                  message: 'Tới giờ uống thuốc rồi',
                  repeatType: 'day',
                  repeatTime: 1,
                });
                setIsVisible(false);
                setHour(null);
                setMinute(null);
              }}
            />
          </Overlay>
        </View>
        <Icon
          style={styles.alarmNew}
          name="alarm"
          onPress={() => setIsVisible(true)}
          size={30}
          reverse
          color="#C4DFAA"
          containerStyle={{
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  alarmNew: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  txtMedical: {
    fontSize: 18,
    fontWeight: '400',
  },
  txtMedicalHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2C3639',
    textAlign: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  txtAlarm: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3639',
  },
  alarmContainer: {},
});
export default Prescription;
