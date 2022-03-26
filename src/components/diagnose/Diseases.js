import React from 'react';
import {View, Text} from 'react-native';

const Diseases = ({name, percent}) => (
  <View>
    <Text>{name}</Text>
    <View style={{width: '100%', backgroundColor: 'whitesmoke', height: 10}}>
      <View style={{width: percent, backgroundColor: 'blue', height: 10}} />
    </View>
  </View>
);

export default Diseases;
