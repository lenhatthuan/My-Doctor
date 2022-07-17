import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../theme/style';
import {NUMBER_STATE} from '../../models/types';
import {
  getPositionsByPatient,
  expired,
  getPositionsByState,
} from '../../store/actions/position';
import Position from '../../components/position/position';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';

export default function PositionScreen(props) {
  const [data, setData] = useState();
  const [selectedValue, setSelectedValue] = useState('all');

  useEffect(() => {
    expired()
      .then(res => console.log(res.message))
      .catch(err => console.error(err));
    pickState();
  }, []);

  const pickState = (state = selectedValue) => {
    AsyncStorage.getItem('patientData').then(res => {
      if (state !== 'all') {
        getPositionsByState(JSON.parse(res).patientId, state)
          .then(data => setData(data))
          .catch(err => console.error(err));
      } else {
        getPositionsByPatient(JSON.parse(res).patientId)
          .then(result => setData(result))
          .catch(err => console.error(err));
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/imgs/h2.png')}
        style={styles.containerList}>
        <Icon
          name="arrow-back"
          onPress={() => props.navigation.goBack()}
          color="white"
          containerStyle={{alignSelf: 'flex-start', margin: 10}}
        />
        <Text style={styles.title}>Lịch khám</Text>
        <Picker
          style={{width: 200, color: 'white'}}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            pickState(itemValue);
          }}
          mode="dropdown">
          <Picker.Item label="Tất cả" value={'all'} key={0} />
          <Picker.Item
            label="Chưa sử dụng"
            value={NUMBER_STATE.NOT_USE}
            key={1}
          />
          <Picker.Item label="Quá hạn" value={NUMBER_STATE.EXPIRED} key={2} />
          <Picker.Item label="Đã sử dụng" value={NUMBER_STATE.USED} key={3} />
          <Picker.Item label="Đã hủy" value={NUMBER_STATE.CANCEL} key={4} />
        </Picker>
        <FlatList
          ListEmptyComponent={<Text style={{alignSelf: 'center'}}>Trống</Text>}
          data={data}
          renderItem={({item}) => <Position item={item} load={pickState} />}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
