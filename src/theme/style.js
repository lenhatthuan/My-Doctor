import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    margin: 24,
    marginTop: 0,
    fontSize: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  space: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 50,
    margin: 20,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  captcha: {
    fontSize: 30,
    letterSpacing: -5,
  },
  captcha_background: {
    width: 180,
    alignItems: "center",
  },
});
