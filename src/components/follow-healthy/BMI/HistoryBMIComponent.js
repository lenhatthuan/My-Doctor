import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import STRING from "../../../utils/string";
import HeaderBackComponent from "../../common/HeaderBackComponent";
import MainComponent from "../../follow-healthy/MainComponent";
import DateHistory from "./DateHistoryBMI";
import AddBMIComponent from "./AddBMIComponent";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../../../../assets/colors";
import BtnAddComponent from "../../common/BtnAddComponent";
const HistoryBMIComponent = (props) => {
  const [isAddModel, setIsAddModel] = useState(false);
  const cancelGoalApplicationHandler = () => {
    setIsAddModel(false);
  };
  const onBack = () => {
    console.log("Back to follow !!");
    props.navigation.navigate("FollowHeathy");
  };

  const addData = () =>{
    setIsAddModel(true);
  }

  return (
    <View style={styles.screen}>
      <HeaderBackComponent title={STRING.headerHistoryBMI} onBack={onBack} />

      <View style={styles.main}>
      <View style = {styles.mainComponent} ><MainComponent /></View>
        <View style={styles.chartComponent}>
        
        </View>

        <View style={styles.historyComponent}>
          <View style = {styles.detailDate}>
            <Text  style={styles.txtHistoryComponent}>Lịch sử do</Text>
           <DateHistory
              date = "Ngày cập nhập"
              title = "Chiều cao (cm)/ cân nặng (kg)"
              data = "BMI"
            />
             <DateHistory
              date = "Ngày cập nhập"
              title = "Chiều cao (cm)/ cân nặng (kg)"
              data = "BMI"
            />
          </View>
          <Pressable style={styles.getAll} onPress={() => {
            props.navigation.navigate("ListBMI");
          }}>
            <Text style={styles.txtGetAll}>{STRING.getAllData}</Text>
            <AntDesign name="arrowright" size={24} color={COLORS.blueMint} />
          </Pressable>


            <BtnAddComponent
            title = {STRING.addData}
            onPress = {addData} />
             <AddBMIComponent
              visible={isAddModel}
              onCancel = {cancelGoalApplicationHandler}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  main: {
    flexDirection: 'column',
    justifyContent:'center',
    flex:1
  },
  mainComponent:{
    flex:1,
    height: '80%',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  chartComponent: {
    margin: 10,
    padding: 10,
    backgroundColor:'white',
    flex:3,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  historyComponent: {
    backgroundColor:'white',
    flex:3,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection:'column'
  },
  txtGetAll: {
    color: COLORS.blueMint,
    fontWeight:'bold'
  },
  getAll:{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
   
  },
  txtHistoryComponent:{
    fontWeight:'bold',
    margin: 10
  },
  detailDate:{
    flex:2,
    height:'100%'
  }
});

export default HistoryBMIComponent;
