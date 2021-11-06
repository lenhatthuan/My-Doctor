import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
const DateHistoryHeart = (props) =>{
    return (
        <View style = {styles.main}> 
            <View style = {styles.component}>
                <Text style = {styles.txtComponent}>{props.time}</Text>
            </View>
            <View style = {styles.component}>
                <Text style = {styles.txtComponent}>{props.title}</Text>
            </View>
            <View style = {styles.component}>
                <Text style = {styles.txtComponent}>{props.heartBeat}</Text>
            </View>
            <View style = {styles.component}>
                <Text style = {styles.txtStatus}>{props.status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    txtStatus: {
        fontWeight:'bold',
        color: '#E02401'
    }, 

    main:{
        flex:1,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
    },
    component:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    txtComponent:{
        fontWeight:'bold'
    }
})

export default DateHistoryHeart;