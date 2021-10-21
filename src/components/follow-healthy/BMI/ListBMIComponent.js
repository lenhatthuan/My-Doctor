import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,  FlatList, AsyncStorage, Pressable} from 'react-native';
import HeaderFilterByDate from "../../common/HeaderFilterByDate";
import STRING from '../../../utils/string';
import COLORS from "../../../../assets/colors";
import DateHistory from './DateHistoryBMI';
import AddFitlerComponent from '../../common/AddFitlerComponent';
import { getAllBMI } from '../../../store/actions/bmi';
import Moment from 'moment';
import { HoldMenuProvider, HoldItem  } from 'react-native-hold-menu';
const ListBMIComponent = (props) =>{

    const [filter, setFilter] =  useState(false);
    const [listBMI, setListBMI] =  useState(false);
    const openCalendar = () =>{
        setFilter(true);
    }
    const cancelOpenCalendar = () =>{
        setFilter(false);
    }

    const getFilter = () =>{
        console.log("Get filter !!")
    }

    useEffect(() => {
        getAllListBMI();
    }, [])

    const convertTitle = (tall, weigh) =>{
        return tall + "/" + weigh;
    }

    const formatDate = (date) =>{
        Moment.locale('en');
        return Moment(date).format('DD-MM-YYYY');
    }

    const getAllListBMI = async() => {
        let id = await AsyncStorage.getItem("id");
        await getAllBMI(id).then(bmi => {
            if(bmi) {
                setListBMI(bmi);
            }
        })
    }

    const menuItems = [
        {text: 'Edit', icon: 'edit', onPress: () =>{}},
        {text: 'Delete', icon: 'trash', onPress: ()=>{}}
    ]

    const renderDate = ({item}) =>{
        return (
            <Pressable style = {styles.dateComponent} onPress = {() =>{
        //     <HoldMenuProvider theme="light">
        //     {/* Your app components */}
        //   </HoldMenuProvider>
        console.log("menu items");
        return (<HoldItem items = {menuItems} menuAnchorPosition="bottom-right">
        </HoldItem>);
            }}>
                <DateHistory
            date = {formatDate(item.createdAt)}
            title = {convertTitle(item.tall, item.weigh)}
            data = {item.bmi}
            />
            </Pressable>
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
            data = {listBMI}
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