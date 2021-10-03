import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import COLORS from '../../assets/colors';
import BMIComponent from '../components/follow-healthy/BMIComponent';
import EmotionComponent from '../components/follow-healthy/EmotionComponent';
import HeartComponent from '../components/follow-healthy/HeartComponent';
import MainComponent from '../components/follow-healthy/MainComponent';

const FollowHeathyScreen = props =>{
    const [goToHistoryBMI, setGotoHistoryBMI]=  useState(false);
    const redirectedToBMI = () =>{
        console.log("flow BMI")
        props.navigation.navigate("BMIHistory");
    }

    return (
        <View style = {styles.screen}>
           <View style = {styles.main}>
               <View style = {styles.mainCmp}><View style = {styles.mainComponent}><MainComponent/></View></View>
               <View style = {styles.component}><EmotionComponent/></View>
               <View style = {styles.component}><HeartComponent/></View>
               <View style = {styles.component}><BMIComponent
                goToHistory = {redirectedToBMI}
               /></View>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCmp:{
        flex: 1
    },
    mainComponent:{
        height: '80%',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    component:{
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    screen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    main: {
        justifyContent:'center',
        flexDirection: 'column',
        width: '100%',
        height: '95%'
    },

})

export default FollowHeathyScreen;