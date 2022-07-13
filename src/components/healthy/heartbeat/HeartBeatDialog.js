import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../../../theme/basic';
import {createHeart, updateHeartBeat} from '../../../store/actions/heart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeartBeatDialog = ({
  id,
  initDiastole,
  initSystole,
  initHeartBeat,
  action = 'add',
  close,
}) => {
  const [diastole, setDiastole] = useState(initDiastole);
  const [systole, setSystole] = useState(initSystole);
  const [heartBeat, setHeartBeat] = useState(initHeartBeat);

  return (
    <View style={{width: 300}}>
      <Text style={styles.text_footer}>Tâm thu</Text>
      <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setSystole(text)}
          keyboardType="numeric"
          value={systole}
        />
        <Text> mmHg</Text>
      </View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 15,
          },
        ]}>
        Tâm trương
      </Text>
      <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setDiastole(text)}
          keyboardType="numeric"
          value={diastole}
        />
        <Text> mmHg</Text>
      </View>
      <Text
        style={[
          styles.text_footer,
          {
            marginTop: 15,
          },
        ]}>
        Nhịp tim
      </Text>
      <View style={styles.action}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setHeartBeat(text)}
          keyboardType="numeric"
          value={heartBeat}
        />
        <Text> nhịp/phút</Text>
      </View>
      <TouchableOpacity
        disabled={!(systole > 0 && diastole > 0 && heartBeat > 0)}
        style={[styles.signIn, {backgroundColor: '#009387', marginTop: 15}]}
        onPress={() => {
          if (action === 'add') {
            AsyncStorage.getItem('accountData').then(res => {
              const account = JSON.parse(res);
              createHeart(account.accountId, diastole, systole, heartBeat)
                .then(res => close())
                .catch(err => console.log(err));
            });
          } else if (action === 'edit') {
            updateHeartBeat(id, diastole, systole, heartBeat)
              .then(res => close())
              .catch(err => console.log(err));
          }
        }}>
        <Text style={[styles.textSign, {color: '#fff'}]}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeartBeatDialog;
