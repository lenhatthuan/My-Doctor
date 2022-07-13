import React from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import COLORS from '../../../assets/colors';
const BtnAddComponent = props => {
  const onPress = () => {
    props.onPress();
  };

  return (
    <View style={styles.bottom}>
      <TouchableOpacity style={styles.btnSave} onPress={onPress}>
        <Text style={styles.txtSave}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnSave: {
    width: '80%',
    backgroundColor: COLORS.btnSave,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  txtSave: {
    fontWeight: 'bold',
    color: 'white',
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default React.memo(BtnAddComponent);
