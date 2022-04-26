import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
const WithCheckInternet = WrappedComponent => props => {
  const [isConnected, setIsConnected] = useState(true);
  const checkConnectInternet = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected);
      }
    });
  };
  useEffect(() => {
    checkConnectInternet();
  });
  return (
    <View style={styles.screen}>
      {!isConnected ? (
        <View style={styles.noIternetContainer}>
          <Text style={styles.txtNoInternet}>No internet connected...</Text>
        </View>
      ) : null}
      <View style={styles.mainScreen}>
        <WrappedComponent {...props} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  noIternetContainer: {
    height: 30,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  txtNoInternet: {
    color: 'white',
  },
  mainScreen: {
    flex: 1,
  },
});
export default WithCheckInternet;