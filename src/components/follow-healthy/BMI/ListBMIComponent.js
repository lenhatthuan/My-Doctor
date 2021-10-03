import React, {useState} from 'react';
import {View, Text, StyleSheet,  FlatList} from 'react-native';
import HeaderFilterByDate from "../../common/HeaderFilterByDate";
import STRING from '../../../utils/string';
import COLORS from "../../../../assets/colors";
import DateHistory from './DateHistoryBMI';
import AddFitlerComponent from '../../common/AddFitlerComponent';
const ListBMIComponent = (props) =>{

    const [filter, setFilter] =  useState(false);
    
    const openCalendar = () =>{
        setFilter(true);
    }
    const cancelOpenCalendar = () =>{
        setFilter(false);
    }

    const getFilter = () =>{
        console.log("Get filter !!")
    }
    const DATA = [
        {
          date: "20/10/2021",
          title: "153/47",
          data:"20.8"
        },
        {
            date: "20/10/2021",
            title: "153/47",
            data:"20.8"
          },
          {
            date: "20/10/2021",
            title: "153/47",
            data:"20.8"
          },
      ];

      const renderDate = ({item}) =>{
          return (
             <View style = {styles.dateComponent}>
                  <DateHistory
              date = {item.date}
              title = {item.title}
              data = {item.data}
              />
             </View>
          )
      }

    const DateHistoryHeader = () =>{
        return (
            <View style = {styles.mainDate}> 
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>Ngày cập nhập</Text>
                </View>
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>Chiều cao (cm)/ cân nặng (kg)</Text>
                </View>
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>BMI</Text>
                </View>
               
            </View>
           
        )
    }
    

    const onBack = () =>{
        props.navigation.navigate("BMIHistory");
    }
    return (
        <View style = {styles.screen}>
            <HeaderFilterByDate
            title = {STRING.historyMeasure} 
            onBack = {onBack}
            openCalendar = {openCalendar}
            />
            <View style = {styles.main}>
            <DateHistoryHeader/>
            <FlatList
            data = {DATA}
            renderItem = {renderDate}
            >

            </FlatList>
            </View>
            <AddFitlerComponent
                    visible = {filter}
                    onCancel = {cancelOpenCalendar}
                    onPress = {getFilter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    main:{
        flex:1
    },
    mainDate:{
        padding:5,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: COLORS.TeaGreen
    },
    component:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    txtComponent:{
        fontWeight:'bold',
        color:'white'
    },
    dateComponent:{
        marginTop: 10,
        marginBottom: 10
    }
})

export default ListBMIComponent;