import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const BtnDiseases = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.txtBtn}>Thêm triệu chứng</Text>
    </TouchableOpacity>
  );
};

export default React.memo(BtnDiseases);

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    backgroundColor: '#76BA99',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  txtBtn: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
  },
});
