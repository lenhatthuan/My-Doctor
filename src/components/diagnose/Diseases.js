import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import diseases from '../../config/diseases';
const Diseases = ({name, percent}) => {

  const convertToVN = (name) => {
    console.log(name)
    let newName = diseases.find(o => o.text == name);
    return newName?.laytext;
  }

  return (
    <View style = {styles.body}>
      <Text style = {styles.txtName}>{convertToVN(name)}</Text>
      <View style={{width: '100%', backgroundColor: 'whitesmoke', height: 10}}>
        <View style={{width: percent, backgroundColor: 'blue', height: 10}} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  txtName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default Diseases;
