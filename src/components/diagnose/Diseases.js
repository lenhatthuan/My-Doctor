import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Diseases = ({name, percent}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={styles.txtName}>{name}</Text>
      <View style={{width: '100%', backgroundColor: 'whitesmoke', height: 10}}>
        <View style={{width: percent, backgroundColor: 'teal', height: 10}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  txtName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Diseases;
