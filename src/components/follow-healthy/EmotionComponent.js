import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import STRING from "../../utils/string";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const EmotionComponent = (props) => {
  const [dateUpdate, setDateUpDate] = useState("23/09/2021");

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>{STRING.textHeaderEmotionComponent}</Text>
        <View style={styles.date}>
          <Text style={styles.txtDate}>{dateUpdate}</Text>
          <AntDesign name="rightcircleo" size={12} color="black" />
        </View>
      </View>
      <View style={styles.body}>
        <View style = {styles.iconBody}> 
          <Ionicons name="happy" size={45} color="blue" />
        </View>
          <Text style={styles.txtBody}>{STRING.textBodyEmotionComponent}</Text>
        <View style = {styles.btnBody}>
          <Pressable style = {styles.buttonBody}><Text style = {styles.txtBtnBody}>{STRING.buttonUpdate}</Text></Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  body: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingRight: 5,
  },
  txtDate:{
      paddingRight: 5
  },
  txtBody:{
      fontWeight:'bold',
      padding: 5,
      width: '63%'
  },
  txtHeader:{
      fontWeight: 'bold'
  },
  iconBody:{
    width: '15%',
  },
  btnBody:{
    width: '25%'
  },
  buttonBody:{
    borderColor: COLORS.Onahau,
    borderWidth: 2,
    backgroundColor: Colors.BayofMany,
      borderRadius: 8,
      width: '100%',
      height:'35%',
      color: 'black',
      alignItems:'center',
      justifyContent:'center',
      fontSize: 12,
      fontWeight: 'bold',
      padding: 5
  },
  txtBtnBody:{
      color: COLORS.BayofMany,
      fontWeight: 'bold'
  }
});

export default EmotionComponent;
