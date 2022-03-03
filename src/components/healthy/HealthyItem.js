import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from '../../theme/healthy';

const HealthyItem = ({onPress, title, icon, content, add, button}) => {
  return (
    <Pressable style={styles.main} onPress={onPress}>
      <Text style={{fontWeight: 'bold'}}>{title}</Text>
      <View style={styles.body}>
        {icon}
        <Text style={{flex: 0.9}}>{content}</Text>
        <View>
          <Pressable style={styles.buttonBody} onPress={add}>
            <Text style={styles.txtBtnBody}>{button}</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default HealthyItem;
