import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, SafeAreaView, StatusBar} from 'react-native';

const Welcome = props => {
  const logo = useRef(new Animated.Value(0)).current;
  const text = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logo, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(text, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => props.navigation.replace('SignIn'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../../assets/logo.png')}
        style={{
          opacity: logo,
          transform: [
            {
              translateY: logo.interpolate({
                inputRange: [0, 1],
                outputRange: [90, 0],
              }),
            },
          ],
        }}
      />
      <Animated.Text style={[styles.text, {opacity: text}]}>
        Ứng dụng hẹn khám bệnh và theo dõi sức khỏe!
      </Animated.Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: 18,
    color: '#009daf',
    fontWeight: 'bold',
    marginHorizontal: 100,
    textAlign: 'center',
  },
});

export default Welcome;
