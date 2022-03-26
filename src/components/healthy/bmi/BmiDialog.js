import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../../../theme/basic';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BmiDialog = ({id, initTall, initWeight, action = 'add', close}) => {
  const [tall, setTall] = useState(initTall);
  const [weight, setWeight] = useState(initWeight);

  return (
    <View style={{width: 200}}>
      <View style={styles.action}>
        <TextInput
          placeholder="Chiều cao"
          placeholderTextColor="#666666"
          style={styles.textInput}
          onChangeText={text => setTall(text)}
          keyboardType="numeric"
          value={tall}
        />
        <Text> cm</Text>
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Cân nặng"
          placeholderTextColor="#666666"
          style={styles.textInput}
          onChangeText={text => setWeight(text)}
          keyboardType="numeric"
          value={weight}
        />
        <Text> kg</Text>
      </View>
      <TouchableOpacity
        disabled={!(tall > 0 && weight > 0)}
        style={[styles.signIn, {backgroundColor: '#009387', marginTop: 15}]}
        onPress={() => {
          //   if (action === "add") {
          //     AsyncStorage.getItem("accountData").then((res) => {
          //       const account = JSON.parse(res);
          //       createBMI(account.accountId, tall, weight)
          //         .then((res) => close())
          //         .catch((err) => console.log(err));
          //     });
          //   } else if (action === "edit") {
          //     updateBMI(id, tall, weight)
          //       .then((res) => close())
          //       .catch((err) => console.log(err));
          //   }
        }}>
        <Text style={styles.textSign}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BmiDialog;
