import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";

const HomeScreen = (props) => {

const gotoLogin = () =>{
  props.navigation.navigate('Signin')
}

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.background}>
        <ImageBackground
          style={styles.imgBg}
          source={require("../../assets/imgs/bg.jpg")}
        >
          <Text>Xin chào !</Text>
          <Button title = 'Đăng nhập' onPress = {gotoLogin}></Button>
        </ImageBackground>
      </View>
      <View style={styles.personalOption}></View>
      <View style={styles.mainOption}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  personalOption: {
    flex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: '#fff'
  },
  mainOption: {
    flex: 2,
    height: "100%",
    width: "100%",
    backgroundColor: '#fff'
  },
});

export default HomeScreen;
