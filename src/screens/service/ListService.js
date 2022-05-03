import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import DoctorServiceItem from '../../components/service/DoctorServiceItem';
import {getAllService} from '../../store/actions/service';
import {getAll} from '../../store/actions/doctor';
import {getAllByPatientId} from '../../store/actions/doctor-registration';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RELOAD_LIST = 'RELOAD_LIST';
const ListService = props => {
  const [namePatient, setNamePatient] = useState('name');
  const [list, setList] = useState([]);
  const [services, setServices] = useState([]);
  const [doctorsAll, setDoctorsAll] = useState([]);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    getNameUser();
    getAllDoctor();
    getListReg();
  }, [status]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      RELOAD_LIST,
      (isReload, statusNew) => {
        getNameUser();
        getAllDoctor();
        getListReg();
        setStatus(statusNew);
      },
    );
    return () => {
      listener.remove();
    };
  }, [status]);

  const getNameUser = () => {
    let patient = null;
    AsyncStorage.getItem('patientData').then(res => {
      patient = JSON.parse(res);
      setNamePatient(patient.fullName);
    });
  };

  const getListReg = () => {
    getAllService().then(res => {
      setServices(res);
      AsyncStorage.getItem('id').then(res => {
        getAllByPatientId(res).then(res => {
          setList(res);
        });
      });
    });
  };

  const getAllDoctor = () => {
    getAll().then(res => {
      setDoctorsAll(res);
    });
  };

  const getNameDoctor = id => {
    let name = '';
    doctorsAll.forEach(res => {
      if (res.id == id) {
        name = res.fullname;
      }
    });
    return name;
  };

  const getDuration = id => {
    let duration = 0;
    services.forEach(res => {
      if (res.id == id) {
        duration = res.duration;
      }
    });
    return duration;
  };

  const listConfirmed = (list, status) => {
    let listcom = [];
    list.forEach(l => {
      if (l.status == status) listcom.push(l);
    });
    return listcom;
  };

  const renderItem = ({item}) => {
    return (
      <DoctorServiceItem
        gotoDetail={gotoDetail}
        name={item.name}
        doctorId={item.doctorId}
        nameDoctor={getNameDoctor(item.doctorId)}
        namePatient={namePatient}
        status={item.status}
        serviceId={item.serviceId}
        updatedAt={item.updatedAt}
        id={item.id}
        duration={getDuration(item.serviceId)}
      />
    );
  };

  const gotoDetail = res => {
    props.gotoDetail(res);
    // props.navigation.navigate("ServiceDetail", {
    //   registration: res});
  };

  return (
    <View>
      {listConfirmed(list, props.status).length > 0 ? (
        <FlatList
          data={listConfirmed(list, props.status)}
          renderItem={renderItem}></FlatList>
      ) : null}
      {listConfirmed(list, props.status).length == 0 ? (
        <View style={styles.centerText}>
          <Text style={styles.textNoData}>Không có dịch vụ nào</Text>
        </View>
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
  centerText: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  textNoData: {
    fontWeight: 'bold',
    color: 'gray',
  },
});

export const loadingListService = (isReload, status) => {
  DeviceEventEmitter.emit(RELOAD_LIST, isReload, status);
};

export default ListService;
