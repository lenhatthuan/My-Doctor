import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TextInput,
  Button,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {getByRecord} from '../../store/actions/prescription';
import {Icon, Overlay} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Prescription = props => {
  const [prescription, setPrescription] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const record = props.route.params.record;

  useEffect(() => {
    getByRecord(record.id)
      .then(result => setPrescription(result.prescription))
      .catch(err => console.error(err));
  }, []);

  const onPressBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <Ionicons
            onPress={onPressBack}
            name="chevron-back"
            size={24}
            color="black"
          />
        </View>
        <View style={{opacity: 1}}>
          <Text style={styles.title}>Toa thuốc</Text>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              marginHorizontal: 15,
              marginVertical: 5,
            }}>
            <Icon
              name="alarm"
              onPress={() => setIsVisible(true)}
              color="black"
            />
            <Text
              style={{
                color: '#44BE92',
                fontSize: 18,
                paddingHorizontal: 2,
                marginHorizontal: 5,
                fontWeight: '500',
              }}>
              Nhắc uống thuốc
            </Text>
          </View>
          <ScrollView>
            {prescription.map(medicine => (
              <View
                style={{
                  borderColor: '#A9EDF2',
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>
                    {medicine.name}
                  </Text>
                  <Text
                    style={{
                      backgroundColor: '#E5F9FC',
                      color: '#0BC4DC',
                      borderRadius: 5,
                      padding: 5,
                      fontSize: 18,
                      fontWeight: '500',
                    }}>
                    Liều lượng: {medicine.amount}
                  </Text>
                </View>
                <Text style={{fontSize: 18}}>{medicine.use}</Text>
              </View>
            ))}
          </ScrollView>

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
      </View>
      <ImageBackground
        source={require('../../../assets/imgs/card_doctor.png')}
        borderRadius={10}
        style={{
          height: 150,
          justifyContent: 'space-between',
          padding: 20,
          margin: 20,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>
          "Lời dặn của bác sĩ: {record.commentByDoctor}
        </Text>
        <Pressable
          style={{
            borderRadius: 10,
            borderColor: 'white',
            borderWidth: 1,
            padding: 10,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Kết nối với bác sĩ</Text>
          <Icon name="navigate-next" color="white" />
        </Pressable>
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
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  txtAlarm: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3639',
  },
  alarmContainer: {},
});
export default Prescription;
