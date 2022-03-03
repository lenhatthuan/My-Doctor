import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  body: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonBody: {
    borderColor: "#009387",
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
  },
  txtBtnBody: {
    color: "#009387",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});