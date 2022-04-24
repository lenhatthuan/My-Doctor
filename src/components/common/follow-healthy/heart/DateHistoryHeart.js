import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AlertDoctorSend from '../../../message/AlertDoctorSend';
import SbNotification from '../../snackbar/SbNotification';
import {
  deleteHeartBeat,
  updateHeartBeat,
} from '../../../../store/actions/heart';
import EditHeartBeat from './EditHeartBeat';
const DateHistoryHeart = props => {
  const [isGetSend, setIsGetSend] = useState(false);
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [isSnackbar, setIsSnackbar] = useState(false);

  useEffect(() => {
    let send =
      'Ngày: ' +
      props.time +
      ', số đo huyết áp: ' +
      props.title +
      ', Nhịp tim: ' +
      props.heartBeat +
      '.';
    setMessage(send);
  });

  const successSnackbar = () => {
    setIsSnackbar(true);
  };

  const onHandleSnackbar = () => {
    setIsSnackbar(false);
  };

  useEffect(() => {
    setDoctors(props.doctors);
  });

  const onCancel = () => {
    setIsGetSend(false);
  };

  const onSend = () => {
    setIsSnackbar(true);
  };

  const onCancelEdit = () => {
    setIsEdit(false);
  };
  const [isEdit, setIsEdit] = useState(false);

  const update = (dis, sys, beat) => {
    updateHeartBeat(props.id, dis, sys, beat).then(res => {
      if (res) {
        setIsEdit(false);
        props.reloadListHeartBeat();
      }
    });
  };

  let HeartBeat = {
    id: props.id,
    diastole: props.diastole,
    systole: props.systole,
    heartBeat: props.heartBeat,
    updatedAt: props.time,
  };

  const onDelete = () => {
    deleteHeartBeat(props.id).then(res => {
      if (res) {
        setIsEdit(false);
        props.reloadListHeartBeat();
      }
    });
  };

  // const sendToDoctor = React.useCallback(() => (
  //   <AlertDoctorSend
  //     visible={isGetSend}
  //     doctors={doctors}
  //     onCancel={onCancel}
  //     onSend={onSend}
  //     content={message}
  //   />
  // ));

  return (
    <View>
      <SbNotification
        visible={isSnackbar}
        message={'Đã gửi thông tin đến bác sĩ!'}
        onPress={onHandleSnackbar}
        action="OK"
      />
       <AlertDoctorSend
      visible={isGetSend}
      doctors={doctors}
      onCancel={onCancel}
      onSend={onSend}
      content={message}
    />
      <View
        style={{justifyContent: 'flex-end', flexDirection: 'row', margin: 5}}>
        <Pressable
          style={{marginRight: 10}}
          onPress={() => {
            setIsGetSend(true);
          }}>
          <MaterialIcons name="send" size={24} color="black" />
        </Pressable>
      </View>
      <Pressable style={styles.main} onPress={() => setIsEdit(true)}>
        <View style={styles.component}>
          <Text style={styles.txtComponent}>{props.time}</Text>
        </View>
        <View style={styles.component}>
          <Text style={styles.txtComponent}>{props.title}</Text>
        </View>
        <View style={styles.component}>
          <Text style={styles.txtComponent}>{props.heartBeat}</Text>
        </View>
        <View style={styles.component}>
          <Text style={styles.txtStatus}>{props.status}</Text>
        </View>
      </Pressable>
      <EditHeartBeat
        visible={isEdit}
        onCancel={onCancelEdit}
        onDelete={onDelete}
        HeartBeat={HeartBeat}
        update={update}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  txtStatus: {
    fontWeight: 'bold',
    color: '#E02401',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtComponent: {
    fontWeight: 'bold',
  },
});

export default React.memo(DateHistoryHeart);
