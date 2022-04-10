import React, {Component} from 'react';
import {SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import COLORS from "../../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome5';
class Home extends Component {

  state = {
    checkIsLogin: false,
    patientName: "",
    isLoading: false,
    isLogout: false
  }

  gotoLogin() {
    // props.navigation.push("Signin");
  }

  signup() {
    // logout();
    // setCheckIsLogin(false);
    // setPatientName("");
    // props.navigation.navigate("Signin");
  }


  
  render() {
    return(
      <SafeAreaView style={styles.screen}>
      {/* <LoadingComponent visible = {isLogout} message = "Logout..."/> */}
      <View style={styles.background}>
        <ImageBackground
          style={styles.imgBg}
          source={require("../../../assets/imgs/bg.jpg")}
        >
          <View style={styles.viewTextName}>
            <Text style={styles.txtHello}>Xin chào !</Text>
            <Text style={styles.txtName}>{this.state.patientName}</Text>
          </View>
          <View style={styles.viewBtnLogin}>
            {!this.state.checkIsLogin ? (
              <Pressable style={styles.btnLogin} onPress={() => gotoLogin()}>
                  <Icon name="arrow-circle-left" solid color ="white">
                </Icon>
                <Text style={styles.txtLogin}>Đăng nhập</Text>
              </Pressable>
            ) : null}
            {this.state.checkIsLogin ? (
              <Pressable
                style={{
                  padding: 10,
                  backgroundColor: "#333",
                  borderRadius: 50,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.39,
                  shadowRadius: 8.3,

                  elevation: 13,
                }}
                onPress={() => signup()}
              >
                 {/* <FontAwesomeIcon icon={ faCoffee } size = {16} /> */}
                {/* <Text style={styles.txtLogin}>Đăng xuất</Text> */}
                <Icon name ="arrow-circle-right" solid color ="white"></Icon>
              </Pressable>
            ) : null}
          </View>
        </ImageBackground>
      </View>
      <View style={styles.personalOption} disabled={!this.state.checkIsLogin}>
        <TouchableOpacity
          style={styles.buttonPersonal}
          onPress={() => {
            // props.navigation.navigate("FollowHeathy");
          }}
        >
          <Image
            style={styles.imgPersonal}
            source={require("../../../assets/imgs/h3.png")}
          />
          <View style={styles.viewTextPersonal}>
            <Text style={styles.textPersonal}>Theo dõi sức khỏe</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonPersonal}
          onPress={() => {
            // props.navigation.navigate("Record");
          }}
        >
          <Image
            style={styles.imgPersonal}
            source={require("../../../assets/imgs/record.png")}
          />
          <View style={styles.viewTextPersonal}>
            <Text style={styles.textPersonal}>Hồ sơ bệnh án</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.mainOption} disabled={!this.state.checkIsLogin}>
        <View style={styles.viewMainOption}>
          <TouchableOpacity
            style={styles.bgBtnGuide}
            onPress={() =>
              Linking.openURL(
                "https://docs.google.com/document/d/1t4UoxC5OWkSfWRKGtPw3aV3-Au9rexTLPhdTbydI_GA/edit"
              )
            }
          >
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Hướng dẫn khám bệnh</Text>
            </View>
            <Image
              style={styles.imgOption}
              source={require("../../../assets/imgs/h1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bgBtnSTT}
            onPress={() => {
              this.props.navigation.navigate("Position");
            }}
          >
            <Image
              style={styles.imgOption}
              source={require("../../../assets/imgs/h2.png")}
            />
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Theo dõi STT khám bệnh</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewMainOption}>
          <TouchableOpacity
            style={styles.bgBtnOnline}
            onPress={() => {
              this.props.navigation.navigate("Service");
            }}
          >
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Bác sĩ riêng</Text>
            </View>
            <Image
              style={styles.imgOption}
              source={require("../../../assets/imgs/online.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bgBtnPayment}
            onPress={() => {
              // props.navigation.navigate("OnlinePayment");
            }}
          >
            <Image
              style={styles.imgOption}
              source={require("../../../assets/imgs/payment.png")}
            />
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Thanh toán online</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  txtHello: {
    fontWeight: "bold",
  },
  txtName: {
    fontWeight: "bold",
    color: "white",
  },
  viewTextName: {
    marginTop: 25,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 30,
  },
  viewBtnLogin: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 10,
    marginRight: 15,
  },
  txtLogin: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnLogin: {
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    // width: "30%",
    padding: 5,
  },
  bgBtnGuide: {
    borderColor: COLORS.Sail,
    borderWidth: 2,
    backgroundColor: COLORS.Malibu,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "75%",
    width: "100%",
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
  },
  bgBtnSTT: {
    borderColor: COLORS.Sail,
    borderWidth: 2,
    backgroundColor: COLORS.Lochinvar,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "75%",
    width: "100%",
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
  },
  bgBtnOnline: {
    borderColor: COLORS.Sail,
    borderWidth: 2,
    backgroundColor: COLORS.Anakiwa,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "75%",
    width: "100%",
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
  },
  bgBtnPayment: {
    borderColor: COLORS.Sail,
    borderWidth: 2,
    backgroundColor: COLORS.Viking,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "75%",
    width: "100%",
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
  },
  imgOption: {
    height: "100%",
    width: "40%",
    marginRight: 5,
    marginLeft: 5,
  },
  btnOption: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 10,
  },
  viewMainOption: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: 15,
  },
  mainOption: {
    flex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
  },
  textPersonal: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  viewTextPersonal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  buttonPersonal: {
    borderColor: COLORS.Onahau,
    borderWidth: 2,
    backgroundColor: COLORS.Turquoise,
    marginRight: 10,
    flex: 1,
    marginLeft: 10,
    width: "80%",
    height: "92%",
    padding: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imgPersonal: {
    height: "70%",
    width: "100%",
    resizeMode: "contain",
  },
  personalOption: {
    flex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
  },
  background: {
    flex: 1.5,
    height: "100%",
    width: "100%",
  },
  imgBg: {
    flex: 1,

    justifyContent: "flex-start",
  },
});

export default Home;
