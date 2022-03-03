import React from 'react';
import {Modal, StyleSheet, Text, Image, View} from 'react-native';

const Loading = ({visible, message}) => {
  return (
    <Modal animationType="fade" visible={visible}>
      <View style={styles.container}>
        <Image source={require('../../assets/loading.gif')} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

export default Loading;
