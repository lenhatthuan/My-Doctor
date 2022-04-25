import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../theme/style';
import {Icon} from 'react-native-elements';
import {getDoctor} from '../../store/actions/doctor';
import {formatDate} from '../../utils/string-format';

const RecordItem = ({item, onPress}) => {
  const [doctorName, setDoctorName] = useState();

  useEffect(() => {
    getDoctor(item.doctorId)
      .then(res => setDoctorName(res.fullname))
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.record}>
      <View>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{item.name}</Text>
        <Text style={{color: 'white'}}>BS. {doctorName}</Text>
      </View>
      <View>
        <Text style={{color: 'white'}}>{formatDate(item.date)}</Text>
        <Icon
          name="capsules"
          type="font-awesome-5"
          color="white"
          onPress={() => onPress(item.id)}
        />
      </View>
    </View>
  );
};

export default RecordItem;
