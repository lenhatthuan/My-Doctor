import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import STRING from "../../utils/string";
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from "../../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AddBMIComponent from "./BMI/AddBMIComponent";

const BMIComponent = (props) => {
    const [dateUpdate, setDateUpDate] = useState("23/09/2021");
    const [isAddModel, setIsAddModel] = useState(false);
    const cancelGoalApplicationHandler = () => {
      setIsAddModel(false);

    };
    
    const goToHistory = () =>{
      props.goToHistory();
     
    }
  
    return (
        <Pressable style={styles.main} onPress = {() =>{
          goToHistory()
        }}>
          <View style={styles.header}>
            <Text style={styles.txtHeader}>{STRING.textHeaderBMIComponent}</Text>
            <Pressable style={styles.date} >
              {/* <Text style={styles.txtDate}  >{dateUpdate}</Text> */}
              <AntDesign name="rightcircleo" size={12} color="black" />
            </Pressable>
          </View>
          <View style={styles.body}>
            <View style = {styles.iconBody}> 
            <FontAwesome5 name="street-view" size={45} color="green" />
            </View>
              <Text style={styles.txtBody}
             >{STRING.textBodyBMIComponent}</Text>
            <View style = {styles.btnBody}>
              <Pressable style = {styles.buttonBody} 
               onPress={() => {
                 console.log("add")
                setIsAddModel(true);
              }}
              ><Text style = {styles.txtBtnBody}>{STRING.buttonUpdate}</Text></Pressable>
              <AddBMIComponent
              visible={isAddModel}
              onCancel = {cancelGoalApplicationHandler}/>

            </View>
          </View>
        </Pressable>
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
    
export default BMIComponent;