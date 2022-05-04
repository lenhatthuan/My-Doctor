import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import DoctorRegistrationComponent from '../../components/service/DoctorRegistrationComponent';
import {getAllByPatientId} from '../../store/actions/doctor-registration';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorOrderScreen = props => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('id').then(id => {
      getAllByPatientId(id).then(res => {
        let resDoctors = res;
        let lDoctor = [];
        resDoctors.forEach(resD => {
          if (resD.status == 'CONFIRMED') lDoctor.push(resD);
        });
        setDoctors(lDoctor);
      });
    });
  }, []);

  const navigateChatWithDoctor = id => {
    //props.navigation.navigate("chat");
  };

  const gotoDoctorProfile = doctor => {
    props.navigation.navigate('DoctorProfile', {
      doctor: doctor,
    });
  };

  const renderItem = ({item}) => {
    return (
      <DoctorRegistrationComponent
        gotoDoctorProfile={gotoDoctorProfile}
        doctorId={item.doctorId}
        navigateChatWithDoctor={navigateChatWithDoctor}
      />
    );
  };
  return (
    <View style={styles.screen}>
      {doctors.length > 0 ? (
        <FlatList
          data={doctors}
          renderItem={renderItem}
          style={{width: '100%'}}></FlatList>
      ) : null}
      {doctors.length == 0 ? (
        <Image
          source={require('../../../assets/imgs/68395-data-not-found.gif')}
          style={{width: '90%', height: '100%'}}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

export default DoctorOrderScreen;
