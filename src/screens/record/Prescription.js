import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  ImageBackground,
  TextInput,
  Button,
  View,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {styles} from '../../theme/style';
import {getByRecord} from '../../store/actions/prescription';
import {Icon, Overlay} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/record.png')}
        style={styles.containerList}>
        <Text style={styles.title}>Đơn thuốc</Text>
        <DataTable style={{backgroundColor: 'white'}}>
          <DataTable.Header>
            <DataTable.Title style={{flex: 1}}>STT</DataTable.Title>
            <DataTable.Title style={{flex: 3}}>Tên thuốc</DataTable.Title>
            <DataTable.Title style={{flex: 2}}>Liều lượng</DataTable.Title>
            <DataTable.Title style={{flex: 4, justifyContent: 'center'}}>
              Cách dùng
            </DataTable.Title>
          </DataTable.Header>
          {prescription.map((medicine, index) => (
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>{++index}</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>{medicine.name}</DataTable.Cell>
              <DataTable.Cell style={{flex: 2, justifyContent: 'center'}}>
                {medicine.amount}
              </DataTable.Cell>
              <DataTable.Cell style={{flex: 4}}>{medicine.use}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <Overlay
          isVisible={isVisible}
          onBackdropPress={() => {
            setHour(null);
            setMinute(null);
            setIsVisible(false);
          }}>
          <Text>Nhắc uống thuốc</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
        <Icon
          name="alarm"
          onPress={() => setIsVisible(true)}
          size={36}
          reverse
          color="orange"
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
export default Prescription;
