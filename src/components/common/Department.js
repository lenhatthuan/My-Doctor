import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from '../../theme/style';

function Department({name, color, department, type, onPress}) {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon
        name={name}
        type={type}
        color={color}
        raised
        size={34}
        onPress={() => {
          onPress(department);
        }}
      />
      <Text>{department}</Text>
    </View>
  );
}

export default function DepartmentList({onPress}) {
  return (
    <View>
      <View style={styles.table}>
        <Department
          type="font-awesome-5"
          name="lungs"
          color="cornflowerblue"
          department="Hô hấp"
          onPress={onPress}
        />
        <Department
          type="font-awesome-5"
          name="assistive-listening-systems"
          color="navajowhite"
          department="Tai-Mũi-Họng"
          onPress={onPress}
        />
        <Department
          name="eye"
          color="dodgerblue"
          department="Mắt"
          type="font-awesome-5"
          onPress={onPress}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="brain"
          color="coral"
          department="Thần kinh"
          type="font-awesome-5"
          onPress={onPress}
        />
        <Department
          name="tooth"
          color="whitesmoke"
          department="Răng-Hàm-Mặt"
          type="font-awesome-5"
          onPress={onPress}
        />
        <Department
          //name="kidney"
          name="question"
          type="font-awesome-5"
          color="indianred"
          department="Thận"
          onPress={onPress}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="baby"
          type="font-awesome-5"
          color="navajowhite"
          department="Phụ sản"
          onPress={onPress}
        />
        <Department
          name="heartbeat"
          color="red"
          department="Tim mạch"
          type="font-awesome-5"
          onPress={onPress}
        />
        <Department
          name="child"
          color="royalblue"
          department="Nhi"
          type="font-awesome-5"
          onPress={onPress}
        />
      </View>
      <View style={styles.table}>
        <Department
          name="stomach"
          type="material-community"
          color="orangered"
          department="Tiêu hóa"
          onPress={onPress}
        />
        <Department
          name="bone"
          color="whitesmoke"
          type="font-awesome-5"
          department="Cơ-Xương-Khớp"
          onPress={onPress}
        />
        <Department
          name="allergies"
          color="navajowhite"
          type="font-awesome-5"
          department="Da liễu"
          onPress={onPress}
        />
      </View>
    </View>
  );
}
