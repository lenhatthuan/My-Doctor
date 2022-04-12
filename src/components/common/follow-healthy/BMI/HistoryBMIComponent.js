import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STRING from "../../../../utils/string";
import HeaderBackComponent from "../../HeaderBackComponent";
import MainComponent from "../MainComponent";
import DateHistory from "./DateHistoryBMI";
import AddBMIComponent from "./AddBMIComponent";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../../../../assets/colors";
import BtnAddComponent from "../../BtnAddComponent";
import { getAllBMI } from "../../../../store/actions/bmi";
import { convertTitle, formatDate } from "../../../../utils/string-format";
const HistoryBMIComponent = (props) => {
  const [isAddModel, setIsAddModel] = useState(false);
  const [isLoadingBMI, setIsLoadingBMI] = useState(true);
  const [heigh, setHeigh] = useState("0");
  const [weight, setWeight] = useState("0");
  const [date, setDate] = useState(new Date());
  const [bmi, setBmi] = useState("0");

  const cancelGoalApplicationHandler = () => {
    setIsAddModel(false);
  };

  const onBack = () => {
    props.navigation.goBack();
  };

  const isNotHaveListBMI = () => {
    if(heigh == "0" && weight == "0") {
      return true;
    }else return false;
  }

  useEffect(() => {
    getAllListBMI();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAllListBMI();
    })
  );

  function date_sort(a, b) {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  }

  const getAllListBMI = async () => {
    let id = await AsyncStorage.getItem("id");
    let arrBMI = null;
    getAllBMI(id).then((bmi) => {
      if (bmi) {
        arrBMI = bmi;
        arrBMI.sort(date_sort);
        setHeigh(arrBMI[arrBMI.length - 1].tall);
        setWeight(arrBMI[arrBMI.length - 1].weigh);
        setDate(arrBMI[arrBMI.length - 1].createdAt);
        setBmi(arrBMI[arrBMI.length - 1].bmi);
      } else {
        setHeigh(0);
        setWeight(0);
        setDate(new Date());
        setBmi(0);
      }

      setIsLoadingBMI(isNotHaveListBMI());
    });
  };

  const addData = () => {
    setIsAddModel(true);
  };

  return (
    <View style={styles.screen}>
      <HeaderBackComponent title={STRING.headerHistoryBMI} onBack={onBack} />
      <View style={styles.main}>
        <View style={styles.mainComponent}>
          <MainComponent />
        </View>
        <View style={styles.chartComponent}>
          <Image  source={require('../../../../../assets/imgs/hi.gif')} style = {{height: '100%', width: '100%'}} />
        </View>
        <View style={styles.historyComponent}>
          <View style={styles.detailDate}>
            <Text style={styles.txtHistoryComponent}>Lịch sử do</Text>
            <DateHistory
              date="Ngày cập nhập"
              title="Chiều cao (cm)/ cân nặng (kg)"
              data="BMI"
            />

            {isLoadingBMI?
        ( <View style = {{justifyContent: 'center', alignItems: 'center'}}> 
        <Image  source={require('../../../../../assets/imgs/loadComponent.gif')} style={{ width: 50, height: 50 }} />
        </View>)
          : <DateHistory
              date={formatDate(date)}
              title={convertTitle(heigh, weight)}
              data={bmi}
            />}
           
          </View>
          <Pressable
            style={styles.getAll}
            onPress={() => {
              props.navigation.navigate("ListBMI");
            }}
          >
            <Text style={styles.txtGetAll}>{STRING.getAllData}</Text>
            <AntDesign name="arrowright" size={24} color={COLORS.blueMint} />
          </Pressable>

          <BtnAddComponent title={STRING.addData} onPress={addData} />
          <AddBMIComponent
            visible={isAddModel}
            onCancel={cancelGoalApplicationHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  mainComponent: {
    flex: 1,
    height: "80%",
    backgroundColor: "white",
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
    backgroundColor: "white",
    flex: 3,
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
    backgroundColor: "white",
    flex: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "column",
  },
  txtGetAll: {
    color: COLORS.blueMint,
    fontWeight: "bold",
  },
  getAll: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  txtHistoryComponent: {
    fontWeight: "bold",
    margin: 10,
  },
  detailDate: {
    flex: 2,
    height: "100%",
  },
});

export default HistoryBMIComponent;
