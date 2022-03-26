import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const HeaderBackComponent = props => {
  const onBack = () => {
    props.onBack();
  };
  return (
    <Pressable style={styles.header} onPress={() => onBack()}>
      <AntDesign name="arrowleft" size={24} color="black" style={styles.icon} />
      <Text style={styles.headerTitle}>{props.title}</Text>
      <AntDesign name="arrowleft" size={24} color="white" style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  },

  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});
export default HeaderBackComponent;
