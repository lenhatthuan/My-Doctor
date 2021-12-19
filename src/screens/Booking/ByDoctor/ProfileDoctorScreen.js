import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from "react-native";
import HeaderBackComponent from "../../../components/common/HeaderBackComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { getAllScheduleByDoctorId } from "../../../store/actions/schedule";
import { formatDate, getDay } from "../../../utils/string-format";
import { getAll, getRoomByID } from "../../../store/actions/room";
import ServiceComponent from "../../../components/ServiceComponent";
import {getAllByDoctorId} from "../../../store/actions/service"
import AddCanlandarComponent from "../../../components/common/AddCanlandarComponent";
 export default function ProfileDoctorScreen ({ route, navigation }) {
  const [filter, setFilter] =  React.useState(false);
  const [getListFilter, setGetListFilter] = React.useState(false);
  const [listSchedule, setListSchedule] = React.useState([]);
  const [listRoom, setListRoom] = React.useState([]);
  const [listService, setListService] =  React.useState([]);
  const {doctor} = route.params;
  const [price, setPrice] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const onBack = () => {
   navigation.navigate("AllDoctor");
  };

  React.useEffect(() => {
    getListService();
    return () => {
    };
    },[]);

    const getListService = () => {
      setIsLoading(true);
      getAllByDoctorId(doctor.id).then(res =>{
        setIsLoading(false);
        if(res) setListService(res);
      })
    }

    let priceTemp = 0;
    const setPriceService = (p) => {
      setPrice(p);
      priceTemp = p;
    }

    let registration = {};
    const setRegistration = (res) => {
      registration = res;
    }
    const gotoPayment = () =>{
      navigation.navigate("payment", {
        price: priceTemp,
        registration: registration
      });
    }

    const renderService = ({item}) =>{
        return (
          <ServiceComponent
          name = {item.name}
          description = {item.description}
          price = {item.price}
          serviceId = {item.id}
          duration = {item.duration}
          doctorId = {item.doctorId}
          setPrice = {setPriceService}
          setRegistration = {setRegistration}
          gotoPayment = {gotoPayment}
          nameDoctor = {doctor.fullname}
         
          />
        )
    }

  const getMonth = () => {
    return new Date().getMonth() + 1;
  }

  const getYear = () => {
    return new Date().getFullYear();
  }

  const getDate = (date) => {
    return getYear() + "-" + getMonth() + "-" + date;
  }

  const setListDate = (schedule) => {
    let list = [];
    schedule.forEach(date => {
      if(date.day <= 31) list.push(getDate(date.day));
    })
    return list;
  }


  const openCalendar = () =>{
    getAllScheduleByDoctorId(doctor.id).then(res => {
      if(res) {setListSchedule(res); setListDate(res);}
      
      getAll().then(res => {
        if(res) setListRoom(res);
       
        setFilter(true);
      })

    })
  }

  const cancelOpenCalendar = () =>{
      setFilter(false);
  }

  const callbackFunction  = async(date) => {
   // await getListRoom();
    getScheduleByDateAndDoctor(date);
    cancelOpenCalendar();
  }

  const getDayCalandar = (date) => {
    return date.substring(8, 10);
  }

  const getScheduleByDateAndDoctor = async(date) => {
    let lSchedule = [];
    listSchedule.forEach(item => {
      if (item.day == getDayCalandar(date)) {
        lSchedule.push(item);
      }
    })

    if (lSchedule.length > 0 && listRoom.length > 0) {
      alert("Tiếp tục chọn lịch khám theo phòng!!");
     // let lRoom = await getListRoom(lSchedule); 
        navigation.navigate("doctor-schedule", {
          schedule: lSchedule,
          room: listRoom,
          doctor: doctor,
          date: formatDate(date)
        });
    } else {
      alert("Hiện ngày chọn không có lịch khám của bác sĩ này!");
    }

  }


  const setDoctorProfile = (item) => {
   // setDoctor(item);
  }

  const [show, setShow] = React.useState(false);


  const onCancelFitler = () => {
    // setListBMI(listBMIStatic);
    setFilter(false);
}
  
  const getFilter = () =>{
    // console.log("Get filter !!" + dateFilter)
    setGetListFilter(true);
   
}

  const titleHeader = "Tư vấn bác sĩ";
  const imageBanner = require("../../../../assets/imgs/banner-profile.png");
//   const name = props.doctor.fullname;

  // Initial scale value of 1 means no scale applied initially.
  const animatedButtonScale = new Animated.Value(1);

  const animatedButtonScaleBtn = new Animated.Value(1);

  // When button is pressed in, animate the scale to 1.5
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  // When button is pressed out, animate the scale back to 1
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // When button is pressed in, animate the scale to 1.5
  const onPressInBtn = () => {
    Animated.spring(animatedButtonScaleBtn, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  // When button is pressed out, animate the scale back to 1
  const onPressOutBtn = () => {
    Animated.spring(animatedButtonScaleBtn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // The animated style for scaling the button within the Animated.View
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  const animatedScaleStyleBtn = {
    transform: [{ scale: animatedButtonScaleBtn }],
  };

  return (
    <View style={styles.screen}>
      <View>
        <HeaderBackComponent title={titleHeader} onBack={onBack} />
      </View>
      <View style={styles.bodyScreen}>
        <View style={styles.profileBody}>
          <Image source={imageBanner} style={styles.banner} />
          <View style={styles.avatarContainer}>
            <Image
              style={styles.imgProfile}
              source={{uri: doctor.avatar}}
            />
          </View>
          <View style={styles.information}>
            <Text style={styles.txtName}>{doctor.fullname}</Text>
            <Text style={styles.txtPosition}>Chuyên khoa {doctor.department}</Text>
          </View>
          <View style={styles.body}>
           <View style = {{justifyContent:'center',  flexDirection: 'column'}}> 
           <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="phone" size={20} color="#FF5151" />
              <Text style={styles.txtBody}>{doctor.phone}</Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="school-outline" size={20} color="#FF5151" />
              <Text style={styles.txtBody}>{doctor.education}</Text>
            </View>
        </View>
            <View style={styles.btnContainer}>
            <TouchableOpacity
              key="2"
              onPress={() => {
                 alert("Hiện chức năng này chưa hoàn thiện!");
              }}
              onPressIn={onPressInBtn}
              onPressOut={onPressOutBtn}
              //  style = {styles.btnAction}
            >
              <Animated.View
                style={[styles.btnActionBtn, animatedScaleStyleBtn]}
              >
                <AntDesign name="message1" size={15} color="white" />
                <Text
                  style={{
                    paddingLeft: 3,
                    color: "white",
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                >
                  Tư vấn
                </Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              key="1"
              onPress={() => {
                openCalendar();
              }}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              //   style = {styles.btnAction}
            >
              <Animated.View style={[styles.btnAction, animatedScaleStyle]}>
                <Ionicons name="calendar-outline" size={15} color="white" />
                <Text
                  style={{
                    paddingLeft: 3,
                    color: "white",
                    fontWeight: "500",
                    fontSize: 15,
                  }}
                >
                  Đặt lịch
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          </View>
          <View style = {{marginTop: 50, padding: 10}}>
            <Text style = {{fontWeight:'bold', marginLeft: 10}}>Dịch vụ</Text>
            <View>

            {isLoading == true ? (
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 10
                }}
              >
                <Image
                  source={require("../../../../assets/imgs/loadComponent.gif")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            ) : null}
            {listService.length == 0 && isLoading == false ? (
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 20
                }}
              ><Text style = {{textAlign: 'center', fontWeight:'bold', color: '#000957'}}>Không có dịch vụ cho bác sĩ này</Text></View>
            ) : null}
            <FlatList
            data = {listService}
            renderItem = {renderService}
            >
            </FlatList>
            </View>
          </View>
        </View>
      </View>

      {/* <AddFitlerComponent
                    visible = {filter}
                    onCancel = {cancelOpenCalendar}
                    setDateFilter = {callbackFunction}
                    onPress = {getFilter}
                    onCancelFilter ={onCancelFitler}
            /> */}
          <AddCanlandarComponent
          visible = {filter}
          onCancel = {cancelOpenCalendar}
          setDateFilter = {callbackFunction}
          onPress = {getFilter}
          onCancelFilter ={onCancelFitler}
          listDate = {setListDate(listSchedule)}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    flexDirection: "row",
    top: 20,
  },

  btnActionBtn: {
    borderRadius: 25,
    backgroundColor: COLORS.TeaGreen,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  btnAction: {
    borderRadius: 25,
    backgroundColor: COLORS.TeaGreen,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  bodyScreen: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },

  profileBody: {
    borderRadius: 21,
    elevation: 3,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
  },

  txtBody: {
    fontSize: 12,
    fontWeight: "500",
    paddingBottom: 3,
    paddingLeft: 5,
  },

  infoBanner: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 5,
  },

  txtNameView: {
    flex: 1,
  },

  txtName: {
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 20,
  },

  txtPosition: {
    color: "#9597A1",
  },

  information: {
    // justifyContent:'flex-start',
    // flexDirection:'column',
    // position:'absolute',
    top: 10,
    justifyContent: "flex-start",
    marginLeft: 30,
    alignItems: "center",
  },

  body: {

    // elevation: 3,
    top: 20,
    paddingLeft: 20
  },

  avatarContainer: {
    height: 100,
    width: 100,
    // alignSelf: "center",
    marginLeft: 15,
    position: "absolute",
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  imgProfile: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  },

  banner: {
    height: 100,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  screen: {
    flex: 1,
  },
});

