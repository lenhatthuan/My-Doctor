import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ListService from "./ListService";

const PenddingSeviceScreen = (props) => {

  const gotoDetail = (res) => {

    props.navigation.navigate("ServiceDetail", {
      registration: res});
  }
  

    return (
        <View style = {styles.screen}>
        <ListService status = "PENDDING" gotoDetail = {gotoDetail}/>
    </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10
    }
  })
  

export default PenddingSeviceScreen;