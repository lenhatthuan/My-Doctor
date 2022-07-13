import {StyleSheet, Image, View, Animated} from 'react-native';
import React from 'react';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const InputImage = ({imageUri}) => {
  const scale = new Animated.Value(1);
  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: scale,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );
  const onHandleStateChange = event => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <View style={styles.inputImageContainer}>
      <View style={styles.imageContainer}>
        <PinchGestureHandler
          onGestureEvent={onZoomEvent}
          onHandlerStateChange={onHandleStateChange}>
          <Animated.Image source={imageUri} />
        </PinchGestureHandler>
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
