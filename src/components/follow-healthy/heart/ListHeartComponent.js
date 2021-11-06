import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,  FlatList, AsyncStorage, Pressable} from 'react-native';
import HeaderFilterByDate from "../../common/HeaderFilterByDate";
import STRING from '../../../utils/string';
import COLORS from "../../../../assets/colors";
import AddFitlerComponent from '../../common/AddFitlerComponent';
import { HoldMenuProvider, HoldItem  } from 'react-native-hold-menu';
import { compareDate } from '../../../utils/convert-date';
import { useFocusEffect } from "@react-navigation/native";
import { getAllHeart } from '../../../store/actions/heart';
import DateHistoryHeart from './DateHistoryHeart';
import { statusHA } from '../../../utils/value-status';
import { convertTitle, formatTime } from '../../../utils/string-format';

const ListHeartComponent = (props) =>{

    const [filter, setFilter] =  useState(false);
    const [listHeart, setListHeart] =  useState(false);
    const [getListFilter, setGetListFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState(new Date());

    const openCalendar = () =>{
        setFilter(true);
    }

    const cancelOpenCalendar = () =>{
        setFilter(false);
    }

    const callbackFunction  = (date) => {
        setDateFilter(date);
    }

    const getFilter = () =>{
        console.log("Get filter !!" + dateFilter)
        setGetListFilter(true);
       
    }
    
    useEffect(() => {
        getAllListHeart();
    }, [])

    const getAllListHeart= async() => {
        let id = await AsyncStorage.getItem("id");
        await getAllHeart(id).then(heart => {
            if(heart) {
                setListHeart(heart);
            }
        })
    }

    // const getAllListHeartByFilterDate = async(date) => {
    //     let heartFilter = listBMI;
    //     let bmiFilterSuccess = [];
    //     bmiFilter.forEach(bmiItem => {
    //         if(formatDate(bmiItem.createdAt) == formatDate(date))
    //             bmiFilterSuccess.push(bmiItem);
    //     });
    //     setListBMI(bmiFilterSuccess);
    // }


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
        return (<HoldItem items = {menuItems} menuAnchorPosition="bottom-right">
        </HoldItem>);
            }}>
                <DateHistoryHeart
            time = {formatTime(item.createdAt)}
            heartBeat = {item.heartBeat}
            title = {convertTitle(item.systole, item.diastole)}
            status = {statusHA(item.diastole, item.systole)}
            />
            </Pressable>
        )
    }

    const DateHistoryHeader = () =>{
        return (
            <View style = {styles.mainDate}> 
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>Ngày/giờ</Text>
                </View>
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>Huyết áp</Text>
                </View>
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>Nhịp tim</Text>
                </View>
                <View style = {styles.component}>
                    <Text style = {styles.txtComponent}>Tình trạng</Text>
                </View>
               
            </View>
           
        )
    }
    

    const onBack = () =>{
        props.navigation.navigate("HeartHistory");
    }
    return (
        <View style = {styles.screen}>
            <HeaderFilterByDate
            title = {STRING.historyMeasure} 
            onBack = {onBack}
            openCalendar = {openCalendar}
            />
            <View style = {styles.main}>
            <DateHistoryHeader />
            <FlatList
            data = {listHeart}
            renderItem = {renderDate}
            >

            </FlatList>
            </View>
            <AddFitlerComponent
                    visible = {filter}
                    onCancel = {cancelOpenCalendar}
                    setDateFilter = {callbackFunction}
                    onPress = {getFilter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    DateHistory: {
        backgroundColor:'white'
    }, 

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
        marginBottom: 10,
        backgroundColor: 'white',
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 10,
        marginLeft: 3,
        marginRight: 3
    }
})

export default ListHeartComponent;