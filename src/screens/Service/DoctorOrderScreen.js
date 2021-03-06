import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Pressable,
} from "react-native";
import { getAllByPatientId } from "../../store/actions/doctor-registration";
import DoctorServiceComponent from "../../components/DoctorServiceComponent";
import { SafeAreaView } from "react-navigation";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "react-native-underline-tabbar";
import { useFocusEffect } from "@react-navigation/native";
import DoctorRegistrationComponent from "../../components/common/DoctorRegistrationComponent";
import { getAllService } from "../../store/actions/service";
import { getAll } from "../../store/actions/doctor";
import { LogBox } from 'react-native';

const DoctorOrderScreen = (props) => {
  const [namePatient, setNamePatient] = React.useState("name");
  const [list, setList] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]); // id doctor
  const [doctorsAll, setDoctorsAll] = React.useState([]); // id doctor
  React.useEffect(() => {
    // getListReg();
    getNameUser();
  }, []);

  useFocusEffect(
  React.useCallback(() => {
    getNameUser();
    getListReg();
    getDoctorByRegistration();
  },[]))


  LogBox.ignoreLogs([
    "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
  ]);
  
  const getListReg = () => {
  
    getAllService().then(res => {
      setServices(res);
      AsyncStorage.getItem("id").then((res) => {
        getAllByPatientId(res).then((res) => {
          setList(res);
        });
      });
    })
   
  };

  const getDuration = (id) => {
    let duration = 0;
    services.forEach(res => {
      if(res.id == id) {
        duration = res.duration;
      }
    })
    return duration;
  }

  const getNameDoctor = (id) => {
    let name = "";
    doctorsAll.forEach(res => {
      if(res.id == id) {
        name = res.fullname;
      }
    })
    return name;
  }

  React.useEffect(() => {
    getDoctorByRegistration();
  }, []);

  const getNameUser = () => {
    let patient = null;
    AsyncStorage.getItem("patientData").then((res) => {
      patient = JSON.parse(res);
      setNamePatient(patient.fullName);
    });
  };

  const getDoctorByRegistration = () => {
    let lDoctor = [];
    getAll().then(res => {
      setDoctorsAll(res);
      AsyncStorage.getItem("id").then((res) => {
        getAllByPatientId(res).then(res => {
           let resDoctors = res;
           resDoctors.forEach(resD => {
             if(resD.status == "CONFIRMED") lDoctor.push(resD);
           });
           setDoctors(lDoctor);
           getListReg();
        })
       });
    })
   
  }

  const renderDoctor = ({item}) =>{
    return (
      <View
        style={{
          marginTop: 10,
          width: "80%",
          marginLeft: "10%",
          marginRight: "10%",
          flex: 1,
        }}
      >
       <DoctorRegistrationComponent
        doctorId = {item.doctorId}
       />
      </View>
    );
  }

  const gotoDetail = (res) => {

    props.navigation.navigate("ServiceDetail", {
      registration: res});
  }

  const renderData = ({ item }) => {
    return (
      <Pressable onPress={() => {gotoDetail()}}
        style={{
          marginTop: 10,
          width: "90%",
          marginLeft: "5%",
          marginRight: "5%",

          flex: 1,
        }}
      >
        <DoctorServiceComponent
          gotoDetail = {gotoDetail}
          name={item.name}
          doctorId={item.doctorId}
          nameDoctor = {getNameDoctor(item.doctorId)}
          namePatient={namePatient}
          status={item.status}
          serviceId={item.serviceId}
          updatedAt={item.updatedAt}
          id={item.id}
          duration = {getDuration(item.serviceId)}
        />
      </Pressable>
    );
  };

  const Page1 = ({ label }) => (
    <View style={styles.container}>
      <Text style={styles.welcome}>{label}</Text>
      {doctors.length > 0 ? (<FlatList data = {doctors} renderItem = {renderDoctor}></FlatList>):
       null
      }
      {doctors.length == 0 ?  (<Image source = {require('../../../assets/imgs/68395-data-not-found.gif')} style = {{width: '90%', height: '100%'}}/>):null}
    </View>
  );

  const Page2 = ({ label }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{label}</Text>

        <FlatList data={list} renderItem={renderData}></FlatList>
      </View>
    );
  };

  const listConfirmed = (list, status) => {
    let listcom = [];
    list.forEach(l => {
      if(l.status == status) listcom.push(l);
    })
    return listcom;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { paddingTop: 20, width: "100%" }]}>
        <ScrollableTabView
          tabBarActiveTextColor="#53ac49"
          renderTabBar={() => <TabBar underlineColor="#53ac49" />}
        >
          <View
           tabLabel={{ label: "B??c s?? ri??ng" }}
          style={styles.container}>
      {doctors.length > 0 ? (<FlatList data = {doctors} renderItem = {renderDoctor} style = {{width: '100%'}}></FlatList>):
       null
      }
      {doctors.length == 0 ?  (<Image source = {require('../../../assets/imgs/68395-data-not-found.gif')} style = {{width: '90%', height: '100%'}}/>):null}
    </View>
          <View
            tabLabel={{ label: "D???ch v???" }}
            style={{
              width: "100%",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            {list != null ? (
              <FlatList data={listConfirmed(list, "CONFIRMED")} renderItem={renderData}></FlatList>
            ) : null}
            {list == null ? (
              <Image
                style={{ height: "100%", width: "90%" }}
                source={require("../../../assets/imgs/70780-no-result-found.gif")}
              />
            ) : null}
          </View>

          <View
            tabLabel={{ label: "Ch??a x??c nh???n" }}
            style={{
              width: "100%",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            {list != null ? (
              <FlatList data={listConfirmed(list, "PENDDING")} renderItem={renderData}></FlatList>
            ) : null}
            {list == null || listConfirmed(list, "PENDDING").length === 0? (
              <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={{ color: "#aaa" }}>
                Hi???n b???n ch??a c?? d???ch v??? n??o.
              </Text>
            </View>
            ) : null}
          </View>
          <View
            tabLabel={{ label: "Ch??a thanh to??n" }}
            style={{
              width: "100%",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            {list != null ? (
              <FlatList data={listConfirmed(list, "CREATED")} renderItem={renderData}></FlatList>
            ) : null}
            {list == null || listConfirmed(list, "CREATED").length === 0? (
              <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={{ color: "#aaa" }}>
                Hi???n b???n ch??a c?? d???ch v??? n??o.
              </Text>
            </View>
            ) : null}
          </View>
          <View
            tabLabel={{ label: "???? h???y" }}
            style={{
              width: "100%",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            {list != null ? (
              <FlatList data={listConfirmed(list, "CANCEL")} renderItem={renderData}></FlatList>
            ) : null}
            {list == null || listConfirmed(list, "CANCEL").length === 0? (
              <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={{ color: "#aaa" }}>
                Hi???n b???n ch??a c?? d???ch v??? n??o.
              </Text>
            </View>
            ) : null}
          </View>

          <View
            tabLabel={{ label: "H???t h???n" }}
            style={{
              width: "100%",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            {list != null ? (
              <FlatList data={listConfirmed(list, "EXPIRED")} renderItem={renderData}></FlatList>
            ) : null}
            {list == null || listConfirmed(list, "EXPIRED").length === 0? (
              <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <Text style={{ color: "#aaa" }}>
                Hi???n b???n ch??a c?? d???ch v??? n??o.
              </Text>
            </View>
            ) : null}
          </View>
        </ScrollableTabView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor:'red'
  },
  container: {
    flex: 1,
    width: "100%",
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    fontSize: 28,
  },
});

export default DoctorOrderScreen;
