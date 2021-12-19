import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const HeaderReloadComponent = (props) => {
  const onBack = () => {
    props.onBack();
  };

  const onReload = () => {
    props.onReload();
  };
  return (
    <View style={styles.header} >

        <View>
          <AntDesign
        onPress={() => {
            onBack();
        }}
            name="arrowleft"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
    <View style = {{flex: 1, justifyContent: 'center', alignItems:'center'}}><Text style={styles.headerTitle}>{props.title}</Text></View>
    
        <AntDesign name="reload1" size={24} color="black" style = {{paddingRight: 5}}  onPress={() => {
            onReload();
        }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 5,
  },

  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign:'center'
  },
});
export default HeaderReloadComponent;
