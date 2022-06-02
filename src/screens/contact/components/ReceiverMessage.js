import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const ReceiverMessage = ({message, createdAt, isImage = false, url = null}) => {
  return !isImage ? (
    <View style={styles.main}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
        {/* <Text style={styles.message}>{createdAt}</Text> */}
      </View>
    </View>
  ) : (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: url}} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 25,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  image: {
    borderRadius: 10,
    resizeMode: 'cover',
    height: 300,
    width: 300,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 5,
    marginRight: 25,
  },
  messageContainer: {
    backgroundColor: '#F4F6F9',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  message: {
    color: 'black',
    fontSize: 15,
  },
});

export default React.memo(ReceiverMessage);
