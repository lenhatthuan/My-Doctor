import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import STRING from "../../../utils/string";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";
import { getAllBMI } from "../../../store/actions/bmi";
import LoadingPageComponent from "../LoadingPageComponent";
const MainComponent = props =>{
    const [heigh, setHeigh] = useState("0");
    const [weight, setWeight] = useState("0");
    const [isPageLoading, setIsPageLoading] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);  
    useFocusEffect(
      React.useCallback(() => {
          getAllListBMI();
      })
    );

    const setPageVisible = (visible) => {
      setIsPageLoading(visible);
    }
  
    const getAllListBMI = async() => {
      let id = await AsyncStorage.getItem("id");
      let arrBMI = null;
      getAllBMI(id).then(bmi => {
        setIsLoading(false);
          if(bmi) {
              arrBMI = bmi;
              arrBMI.sort(date_sort)
          setHeigh(arrBMI[arrBMI.length-1].tall);
          setWeight(arrBMI[arrBMI.length-1].weigh);
          } else {
              setHeigh(0);
              setWeight(0);
          }
      })
  }

    function date_sort(a, b) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }

  return (
    <>
    
      {/* <LoadingPageComponent  setPageVisible = {setPageVisible} visible = {isPageLoading}/> */}
        {isLoading == false ? (
          <View style = {styles.main}>
          <View style = {styles.component}>
          <View style = {styles.headerComponent}>
          <Ionicons name="body" size={24} color="black" />
          <Text style = {styles.txtHeader}>{STRING.textHeightMainComponent}</Text>
          </View>
          <Text style = {styles.bodyComponent}>{heigh}</Text>
      </View>
      <View style = {styles.component}>
          <View style = {styles.headerComponent}>
          <MaterialCommunityIcons name="medical-bag" size={24} color="black" />
          <Text style = {styles.txtHeader}>{STRING.textWeightMainComponent}</Text>
          </View>
          <Text style = {styles.bodyComponent}>{weight}</Text>
      </View>
      </View>
        ): (
          <View style = {styles.main}><Image style={{ width: 50, height: 50 }} source = {require('../../../../assets/imgs/loadComponent.gif')}/></View>
          
        )}
    
    </>
  );
};

const styles = StyleSheet.create({
  main:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
    component:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
       
    },
    bodyComponent:{
      flex:1,
      fontWeight: 'bold'
    },
    headerComponent:{
      justifyContent:'center',
      flexDirection:'row',
      flex:1,
      alignItems: 'center',
  
    },
    txtHeader:{
      color: 'black',
      fontSize: 12,
      fontWeight: 'bold'
    }
});

export default MainComponent;