import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ListService, {loadingListService} from './ListService';

const CancelSeviceScreen = props => {
  const [isBack, setIsBack] = React.useState(false);

  const setGoBack = () => {
    setIsBack(!isBack);
    loadingListService(true, 'CANCEL');
  };

  const gotoDetail = res => {
    props.navigation.navigate('ServiceDetail', {
      registration: res,
      back: setGoBack,
    });
  };

  return (
    <View style={styles.screen}>
      <ListService status="CANCEL" gotoDetail={gotoDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});

export default CancelSeviceScreen;
