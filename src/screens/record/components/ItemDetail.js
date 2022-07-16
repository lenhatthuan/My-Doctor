import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDoctor} from '../../../store/actions/doctor';

const ItemDetail = ({rowData, sectionID, rowID, gotoMedical}) => {
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    getDoctor(rowData.doctorId).then(res => setDoctor(res));
  }, []);
  return (
    <View style={{flex: 1, marginRight: 10}}>
      <View>
        <Text style={styles.txtNameSick}>
          {rowData.name ?? 'Không có tên bệnh'}
        </Text>
      </View>
      <View style={styles.infoDetailContainer}>
        <View style={styles.imgDoctorContainer}>
          <Image
            style={styles.imgDoctor}
            source={{
              uri: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
            }}
          />
        </View>
        <View style={styles.infoSickDetailContainer}>
          <View style={styles.txtDetailContainer}>
            <Text style={styles.txtNameDoctorSick}>
              {' '}
              BS. {doctor?.fullname}
            </Text>
          </View>
          <View style={styles.txtCmtDetailContainer}>
            <MaterialCommunityIcons
              name="format-quote-open-outline"
              size={20}
              color={'#FF5D5D'}
            />
            <Text style={styles.txtCmtByDoctor}>
              {rowData.commentByDoctor ?? 'Không có ghi chú'}
            </Text>
          </View>
          <View style={styles.onPressMecialContainer}>
            <TouchableOpacity
              style={styles.btnMedicalContainer}
              onPress={() => gotoMedical(rowData.id)}>
              <Text style={styles.txtBtnMedical}>Đơn thuốc</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(ItemDetail);

const styles = StyleSheet.create({
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
  txtCmtDetailContainer: {flexDirection: 'row', flex: 1, paddingRight: 10},
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
  txtNameSick: {fontWeight: 'bold', color: '#6CC4A1', fontSize: 14},
  txtNameDoctorSick: {fontWeight: 'bold', color: 'black', fontSize: 13},
  title: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 15,
    color: '#377D71',
    fontWeight: 'bold',
  },
});
