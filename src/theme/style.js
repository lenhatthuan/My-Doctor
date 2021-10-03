import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import COLORS from "../../assets/colors";

export const image = {
  background:
    "https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-blue-gradient-web-ui-background-image_518658.jpg",
  avatar:
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 35,
  },
  title: {
    margin: 30,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    marginHorizontal: 24,
    marginTop: 20,
    fontSize: 15,
  },
  input: {
    height: 50,
    padding: 15,
    backgroundColor: COLORS.Whisper,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 70,
  },
  space: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
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
  gender: { flexDirection: "row", marginHorizontal: 70 },
  captcha: {
    fontSize: 30,
    letterSpacing: -5,
  },
  captcha_background: {
    width: 120,
    alignItems: "center",
    marginLeft: 20,
  },
});
