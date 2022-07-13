import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import InfoDetail from './infoDetail';
const SenderMessage = ({
  message,
  createdAt,
  isImage = false,
  url = null,
  goToImageDetail,
  isInfo = false,
  item,
}) => {
  return isInfo ? (
    <InfoDetail message={item} />
  ) : !isImage ? (
    <View style={styles.main}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
        {/* <Text style={styles.message}>{createdAt}</Text> */}
      </View>
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => {
        goToImageDetail(url);
      }}
      style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: url}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageModalContainer: {
    justifyContent: 'center',
  },
  imageModal: {
    resizeMode: 'cover',
  },
  imageContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingVertical: 10,
    paddingRight: 10,
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
    justifyContent: 'flex-end',
    margin: 5,
    marginLeft: 25,
  },
  messageContainer: {
    backgroundColor: '#42C2FF',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  message: {
    color: 'white',
    fontSize: 15,
  },
});

export default React.memo(SenderMessage);
