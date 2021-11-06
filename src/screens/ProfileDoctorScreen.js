import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  Animated,
} from "react-native";
import HeaderBackComponent from "../components/common/HeaderBackComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

 export default function ProfileDoctorScreen ({ route, navigation }) {
  const [visible, setVisible] = React.useState(true);
  const {doctor} = route.params;
  const onBack = () => {
   navigation.navigate("AllDoctor");
  };

  React.useEffect(() => {
    // setDoctorProfile(props.navigation.getParam("doctor"));
      })

  const setDoctorProfile = (item) => {
   // setDoctor(item);
  }

  const titleHeader = "Tư vấn bác sĩ";
  const imageBanner = require("../../assets/imgs/banner-profile.png");
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
            <Text style={styles.txtPosition}>{doctor.department}</Text>
          </View>
          <View style={styles.body}>
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
              onPress={() => {}}
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
              onPress={() => {}}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    flexDirection: "row",
    top: "10%",
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
    height: "60%",
    width: "70%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
    fontSize: 18,
    lineHeight: 20,
  },

  txtPosition: {
    color: "#9597A1",
  },
  information: {
    // justifyContent:'flex-start',
    // flexDirection:'column',
    // position:'absolute',
    top: "12%",
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    padding: 20,
    top: "10%",
  },

  avatarContainer: {
    height: "25%",
    width: "30%",
    alignSelf: "center",
    position: "absolute",
    top: "25%",
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
    height: "40%",
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

