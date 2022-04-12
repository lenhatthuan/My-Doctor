import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import COLORS from '../../../../assets/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BtnAddComponent from '../../BtnAddComponent';
import STRING from '../../../../utils/string';
import {createBMI} from '../../../../store/actions/bmi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SbNotification from '../../snackbar/SbNotification';
const AddBMIComponent = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isNotifiSuccess, setIsNotifSuccess] = useState(false);
  const [tall, setTall] = useState('');
  const [weigh, setWeigh] = useState('');
  const [message, setMessage] = useState({tall: "", weigh: ""})
  useEffect(() => {
    setModalVisible(props.visible);
  });

  const cancelGoalHandler = () => {
    props.onCancel();
  };

  const onSave = () => {
    if (modalVisible) {
      AsyncStorage.getItem('patientData').then(res => {
        const patient = JSON.parse(res);
        createBMI(patient.patientId, tall, weigh).then(bmi => {
          if (bmi) {
            // alert("Đã thêm BMI thành công !")
            setModalVisible(false);
            props.onCancel();
            setTall('');
            setWeigh('');
            setIsNotifSuccess(true);
          } else {
            alert('Lỗi, không thêm được!');
          }
        });
      });
    }
  };

  return (
    <>
      <SbNotification
        visible={isNotifiSuccess}
        message={'Đã thêm BMI thành công!'}
        onPress={() => setIsNotifSuccess(false)}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => {
            cancelGoalHandler();
          }}>
          <Pressable style={styles.modalView} onPress={() => {}}>
            <View style={styles.header}>
              <Pressable
                style={styles.iconHeader}
                onPress={() => {
                  cancelGoalHandler();
                }}>
                <FontAwesome name="remove" size={24} color="black" />
              </Pressable>
              <View style={styles.viewTxtHeader}>
                <Text style={styles.txtHeader}>Thêm dữ liệu</Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.bodyComponent}>
                <Text style={styles.txtBody}>Chiều cao (cm)</Text>
                <TextInput
                  returnKeyType="done"
                  keyboardType="numeric"
                  placeholder="Chiều cao"
                  style={styles.input}
                  value={tall}
                  onChangeText={text => {
                    setTall(text);
                  }}></TextInput>
                <Text style={styles.txtMessage}> {message.tall}</Text>

              </View>

              <View style={styles.bodyComponent}>
                <Text style={styles.txtBody}>Cân nặng (kg)</Text>
                <TextInput
                  returnKeyType="done"
                  placeholder="Cân nặng"
                  keyboardType="numeric"
                  style={styles.input}
                  value={weigh}
                  onChangeText={text => {
                    setWeigh(text);
                  }}></TextInput>
                <Text style={styles.txtMessage}> {message.weigh}</Text>
              </View>
            </View>
            <BtnAddComponent title={STRING.save} onPress={onSave} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  txtMessage: {
    fontWeight: '400',
    fontSize: 12,
    color: "#FF0000",
    marginBottom: 5
}, 
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalView: {
    width: '100%',
    height: '65%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    paddingTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  txtHeader: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewTxtHeader: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconHeader: {
    paddingLeft: 10,
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  body: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
  },
  bodyComponent: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  txtBody: {
    fontWeight: 'bold',
  },
  btnSave: {
    width: '80%',
    backgroundColor: COLORS.btnSave,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  txtSave: {
    fontWeight: 'bold',
    color: 'white',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default AddBMIComponent;
