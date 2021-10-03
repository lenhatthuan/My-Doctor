import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
const DateHistory = (props) =>{
    return (
        <View style = {styles.main}> 
            <View style = {styles.component}>
                <Text style = {styles.txtComponent}>{props.date}</Text>
            </View>
            <View style = {styles.component}>
                <Text style = {styles.txtComponent}>{props.title}</Text>
            </View>
            <View style = {styles.component}>
                <Text style = {styles.txtComponent}>{props.data}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default DateHistory;