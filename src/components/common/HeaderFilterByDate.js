import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const HeaderFilterByDate = props => {
  const onBack = () => {
    props.onBack();
  };
  return (
    <View style={styles.header}>
      <Pressable style={styles.AntDesign} onPress={() => onBack()}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={{marginLeft: 5}}
        />
      </Pressable>
      <View style={styles.textCmp}>
        <Text style={styles.headerTitle}>{props.title}</Text>
      </View>
      <Pressable
        style={styles.AntDesignCa}
        onPress={() => props.openCalendar()}>
        <AntDesign
          name="calendar"
          size={24}
          color="black"
          style={{marginRight: 5}}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  AntDesign: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  AntDesignCa: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  textCmp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HeaderFilterByDate;
