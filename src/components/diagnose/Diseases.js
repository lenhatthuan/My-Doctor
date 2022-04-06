import React from 'react';
import {View, Text} from 'react-native';

const Diseases = ({disease}) => (
  <View>
    <Text>{disease.name}</Text>
    <Text>{disease.department}</Text>
    <View style={{width: '100%', backgroundColor: 'whitesmoke', height: 10}}>
      <View
        style={{width: disease.percent, backgroundColor: 'blue', height: 10}}
      />
    </View>
  </View>
);

export default Diseases;
