import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DoctorServiceItem from '../../components/service/DoctorServiceItem';
import { getAllService } from "../../store/actions/service";
import ListService from "./ListService";

const CancelSeviceScreen = (props) => {

    const gotoDetail = (res) => {

        props.navigation.navigate("ServiceDetail", {
          registration: res});
      }

    return (
        <View style = {styles.screen}>
            <ListService status = "CANCEL" gotoDetail = {gotoDetail}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10
    }
  })

  
export default CancelSeviceScreen;