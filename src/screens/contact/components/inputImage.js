import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const InputImage = ({imageUri}) => {
  return (
    <View style={styles.inputImageContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageUri} />
      </View>
    </View>
  );
};

export default InputImage;

const styles = StyleSheet.create({
  inputImageContainer: {
    backgroundColor: 'white',
  },
  imageContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#',
  },
});
