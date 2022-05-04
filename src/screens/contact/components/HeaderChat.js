import {Text, StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HeaderChat = ({name, imageUrl, onPress}) => {
  return (
    <View style={styles.main}>
      <View>
        <AntDesign
          onPress={onPress}
          name="arrowleft"
          size={24}
          color="black"
          style={styles.icon}
        />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}> {name}</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: imageUrl}} />
      </View>
    </View>
  );
};

export default HeaderChat;

const styles = StyleSheet.create({
  name: {},
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginRight: 30,
    marginLeft: 30,
  },
  nameContainer: {},
  icon: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
