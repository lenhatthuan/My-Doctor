import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../assets/colors";

const HomeScreen = (props) => {
  const gotoLogin = () => {
    props.navigation.navigate("Signin");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.imgBg}
          source={require("../../assets/imgs/bg.jpg")}
        >
          <Text>Xin chào !</Text>
          <Button title="Đăng nhập" onPress={gotoLogin}></Button>
        </ImageBackground>
      </View>
      <View style={styles.personalOption}>
        <TouchableOpacity style={styles.buttonPersonal}>
          <Image
            style={styles.imgPersonal}
            source={require("../../assets/imgs/h3.png")}
          />
          <View style={styles.viewTextPersonal}>
            <Text style={styles.textPersonal}>Theo dõi sức khỏe</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPersonal}>
          <Image
            style={styles.imgPersonal}
            source={require("../../assets/imgs/record.png")}
          />
          <View style={styles.viewTextPersonal}>
            <Text style={styles.textPersonal}>Hồ sơ bệnh án</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.mainOption}>
        <View style={styles.viewMainOption}>
          <TouchableOpacity style={styles.btnOption}>
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Hướng dẫn khám bệnh</Text>
            </View>
            <Image
              style={styles.imgOption}
              source={require("../../assets/imgs/h1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <Image
              style={styles.imgOption}
              source={require("../../assets/imgs/h2.png")}
            />
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Theo dõi STT khám bệnh</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewMainOption}>
          <TouchableOpacity style={styles.btnOption} >
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Mua thuốc online</Text>
            </View>
            <Image
              style={styles.imgOption}
              source={require("../../assets/imgs/online.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOption}>
            <Image
              style={styles.imgOption}
              source={require("../../assets/imgs/payment.png")}
            />
            <View style={styles.viewTextPersonal}>
              <Text style={styles.textPersonal}>Thanh toán online</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgOption: {
    height: "80%",
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
    paddingTop: 15,
  },
  mainOption: {
    flex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
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

export default HomeScreen;
