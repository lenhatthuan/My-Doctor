import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const HeaderBackComponent = (props) =>{

    const onBack = () =>{
        props.onBack();
    }
    return (
        <Pressable style = {styles.header} onPress = {() => onBack()}>
           <AntDesign name="arrowleft" size={24} color="black" style = {styles.icon} />
            <Text style = {styles.headerTitle}>{props.title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    icon: {
        paddingLeft: 5
    },

    header:{
        width: '100%',
        height: 70,
        paddingTop: 36,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems:'center'
    },
    headerTitle:{
        color:'black',
        fontSize: 14,
        fontWeight:'bold',
        marginLeft:'35%'
    }
})
export default HeaderBackComponent;