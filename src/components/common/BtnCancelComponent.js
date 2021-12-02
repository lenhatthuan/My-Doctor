import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
const BtnCancelComponent = props =>{

    const onPress = ()=>{
        props.onPress();
    }
    return(
        <View style={styles.bottom}>
           <Pressable  
            style={styles.btnSave} onPress = {() => onPress()}>
                <Text style = {styles.txtSave}>{props.title}</Text>
            </Pressable>
           </View>
    )
}

const styles = StyleSheet.create({
    btnSave:{
        width:'80%',
        backgroundColor: '#F90716',
        padding: 10,
        borderRadius: 10,
        alignItems:'center',
        marginBottom:10
      },
      txtSave: {
        fontWeight: "bold",
        color:'white'
      },
      bottom:{
          flex:1,
          width:'100%',
        //   justifyContent:'flex-end',
          alignItems:'center'
      }
})

export default BtnCancelComponent;