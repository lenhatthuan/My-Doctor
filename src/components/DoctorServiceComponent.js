import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getDoctor } from "../store/actions/doctor";
import { AntDesign } from "@expo/vector-icons";
import CountDown from 'react-native-countdown-component';
import {
  changeColorDoctorRegistration,
  changeStatusDoctorRegistration,
  getTime,
} from "../utils/string-format";
import { getServiceById } from "../store/actions/service";
import { updateRegistration } from "../store/actions/doctor-registration";
import { LogBox } from 'react-native';

const DoctorServiceComponent = (props) => {
  const [doctorName, setDoctorName] = React.useState("Name");
  const [duration, setDuration] = React.useState(100);
  const durationP = props.duration;


  // React.useEffect(() => {
  //   getDuration();
  //   console.log("duration 1")
  //   // return () => {
  //   //   setDuration(0); // This worked for me
  //   // };
    
  // },[]);

  LogBox.ignoreLogs([
    'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  ]);
  
  React.useEffect(() => {
    setDuration(props.duration);
    getNameDoctor();
    //setDoctorName(props.nameDoctor);
  });


  const updateExpired = () => {
    updateRegistration(props.id, props.name, "EXPIRED").then(res => {
      })
  }

  const getDuration = () => {
    getServiceById(props.serviceId).then(res => {
        setDuration(res.duration);
        console.log("duration: ew")
    })
  }

  const getNameDoctor = () => {
    getDoctor(props.doctorId).then((res) => {
      if (res) setDoctorName(res.fullname);
      console.log("name")
    });
  };

  const getTimeSeconds = () => {
      return getTime(props.updatedAt, duration);
  }

  return (
    
    <View style={styles.screen}>
      <View style={{ width: "100%" }}>
        <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
        <Text style={{}}>Bác sĩ: {doctorName}</Text>
        <Text>Người sử dụng: {props.namePatient} </Text>
        <View
          style={{
            borderBottomColor: "#FF5403",
            borderBottomWidth: 2,
            width: "100%",
            marginTop: 5,
            flex: 1,
          }}
        />
        <View style={{ padding: 10 , flexDirection: 'row', justifyContent:'space-between'}}>
          <Text
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              color: changeColorDoctorRegistration(props.status),
            }}
          >
            {changeStatusDoctorRegistration(props.status)}
          </Text>

          <AntDesign name="right" size={24} color={changeColorDoctorRegistration(props.status)} />
        </View>
      </View>
     {props.status == 'CONFIRMED' ?  <CountDown
        until={getTimeSeconds()}
        onFinish={() => updateExpired()}
        // onPress={() => getTimeSeconds()}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['D', 'H', 'S', 'M']}
        timeLabels={{d:'Ngày',h: 'Giờ',m: 'Phút',s: 'Giây'}}
        size={20}
      />: null}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderColor: '#FFB319',
    borderWidth: 1
  },
});

export default DoctorServiceComponent;
