import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const BtnChoose = ({title, isChoose = false, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isChoose && styles.containerChoose]}>
      <Text style={[styles.txtChart, isChoose && styles.txtChartChoose]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(BtnChoose);

const styles = StyleSheet.create({
  txtChart: {
    fontWeight: 'bold',
  },
  txtChartChoose: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 15,
    flex: 1,
  },
  containerChoose: {
    backgroundColor: '#66BFBF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
});
