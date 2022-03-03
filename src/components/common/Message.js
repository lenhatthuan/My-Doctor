import React from 'react';
import {StyleSheet, Text, Modal, View, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';

const Message = ({visible, type, content, press}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={[styles.container, {backgroundColor: type.backgroundColor}]}>
        <Text style={[styles.title, {color: type.color}]}>{type.name}</Text>
        <Icon name={type.icon} color={type.color} size={150} />
        <Text style={{fontSize: 25, textAlign: 'center'}}>{content}</Text>
        <Pressable
          onPress={press}
          style={[styles.button, {backgroundColor: type.color}]}>
          <Text style={{color: 'white', fontSize: 30}}>{type.button}</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '30%',
    marginHorizontal: 50,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
});

export default Message;
