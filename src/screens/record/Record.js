import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, ImageBackground} from 'react-native';
import {styles} from '../../theme/style';
import {getRecordByPatient} from '../../store/actions/record';
import RecordItem from '../../components/record/RecordItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Record = props => {
  const [data, setData] = useState();

  useEffect(() => {
    AsyncStorage.getItem('patientData').then(res => {
      getRecordByPatient(JSON.parse(res).patientId)
        .then(result => setData(result))
        .catch(err => console.error(err));
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/record.png')}
        style={styles.containerList}>
        <Text style={styles.title}>Hồ sơ bệnh án</Text>
        <FlatList
          ListEmptyComponent={
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
              }}>
              Trống
            </Text>
          }
          data={data}
          renderItem={({item}) => (
            <RecordItem
              item={item}
              onPress={id =>
                props.navigation.navigate('Prescription', {recordId: id})
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Record;
