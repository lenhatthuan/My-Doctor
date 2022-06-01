import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {getDoctor} from '../../store/actions/doctor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CountDown from 'react-native-countdown-component';
import {
  changeColorDoctorRegistration,
  changeStatusDoctorRegistration,
  getTime,
} from '../../utils/string-format';
import {getServiceById} from '../../store/actions/service';
import {updateRegistration} from '../../store/actions/doctor-registration';
import {LogBox} from 'react-native';

const DoctorServiceItem = props => {
  const [doctorName, setDoctorName] = React.useState('Name');
  const [duration, setDuration] = React.useState(100);
  const durationP = props.duration;
  let registration = {
    id: props.id,
    name: props.name,
    status: props.status,
    doctorId: props.doctorId,
    serviceId: props.serviceId,
    updatedAt: props.updatedAt,
    duration: props.duration,
    nameDoctor: doctorName,
  };

  LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  ]);

  React.useEffect(() => {
    setDuration(props.duration);
    getNameDoctor();
  });

  const updateExpired = () => {
    updateRegistration(props.id, props.name, 'EXPIRED').then(res => {});
  };

  const getDuration = () => {
    getServiceById(props.serviceId).then(res => {
      setDuration(res.duration);
      console.log('duration: ew');
    });
  };

  const getNameDoctor = useCallback(() => {
    getDoctor(props.doctorId).then(res => {
      if (res) setDoctorName(res.fullname);
    });
  }, []);

  const getTimeSeconds = () => {
    return getTime(props.updatedAt, duration);
  };

  const gotoDetail = () => {
    props.gotoDetail(registration);
  };

  return (
    <Pressable style={styles.screen} onPress={() => gotoDetail()}>
      <View style={{width: '100%'}}>
        <Text style={{fontWeight: 'bold'}}>{props.name}</Text>
        <Text style={{}}>Bác sĩ: {doctorName}</Text>
        <Text>Người sử dụng: {props.namePatient} </Text>
        <View
          style={{
            borderBottomColor: '#FF5403',
            borderBottomWidth: 2,
            width: '100%',
            marginTop: 5,
            flex: 1,
          }}
        />
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: changeColorDoctorRegistration(props.status),
            }}>
            {changeStatusDoctorRegistration(props.status)}
          </Text>

          <AntDesign
            name="right"
            size={24}
            color={changeColorDoctorRegistration(props.status)}
          />
        </View>
      </View>
      {props.status == 'CONFIRMED' ? (
        <CountDown
          until={getTimeSeconds()}
          onFinish={() => updateExpired()}
          digitTxtStyle={{color: '#1CC625'}}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: '#1CC625',
          }}
          timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
          separatorStyle={{color: '#1CC625'}}
          timeToShow={['D', 'H', 'S', 'M']}
          timeLabels={{d: 'Ngày', h: 'Giờ', m: 'Phút', s: 'Giây'}}
          size={20}
        />
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#FFB319',
    borderWidth: 1,
    marginTop: 15,
  },
});

export default React.memo(DoctorServiceItem);
