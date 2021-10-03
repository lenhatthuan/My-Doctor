import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import STRING from "../../utils/string";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const MainComponent = props =>{
    const [heigh, setHeigh] = useState("0");
    const [weight, setWeight] = useState("0");
  return (
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