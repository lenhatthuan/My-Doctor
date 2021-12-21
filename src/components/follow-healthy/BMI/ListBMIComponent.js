import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,  FlatList, AsyncStorage, Pressable, Image} from 'react-native';
import HeaderFilterByDate from "../../common/HeaderFilterByDate";
import STRING from '../../../utils/string';
import COLORS from "../../../../assets/colors";
import DateHistory from './DateHistoryBMI';
import AddFitlerComponent from '../../common/AddFitlerComponent';
import { getAllBMI } from '../../../store/actions/bmi';
import Moment from 'moment';
import { HoldMenuProvider, HoldItem  } from 'react-native-hold-menu';
import { compareDate } from '../../../utils/convert-date';
import { useFocusEffect } from "@react-navigation/native";
import FillterCalandar from '../../common/FillterCalandar';

const ListBMIComponent = (props) =>{

    const [filter, setFilter] =  useState(false);
    const [listBMIStatic, setListBMIStatic] = useState();
    const [listBMI, setListBMI] =  useState([]);
    const [getListFilter, setGetListFilter] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const openCalendar = () =>{
        setFilter(true);
    }

    const cancelOpenCalendar = () =>{
        setFilter(false);
    }

    const callbackFunction  = (date) => {
        getAllListBMIByFilterDate(date);
        cancelOpenCalendar();
    }

    const getFilter = () =>{
        // console.log("Get filter !!" + dateFilter)
        setGetListFilter(true);
       
    }

    useFocusEffect(
        React.useCallback(() => {
          setIsloading(checkList());
        }, [])
      );
    
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
                setIsloading(true);
                setListBMI(bmi);
                setListBMIStatic(bmi);
            }
        })
    }

    const onCancelFitler = () => {
        setIsloading(true);
        setListBMI(listBMIStatic);
        setFilter(false);
    }

    const getAllListBMIByFilterDate = async(date) => {
        let bmiFilter = listBMIStatic;
        let bmiFilterSuccess = [];
        bmiFilter.forEach(bmiItem => {
            if(formatDate(bmiItem.createdAt) == formatDate(date))
                bmiFilterSuccess.push(bmiItem);
        });
        bmiFilterSuccess.length > 0 ? setIsloading(true): setIsloading(false);
        setListBMI(bmiFilterSuccess);
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
    
    const checkList = () => {
        if (listBMI.length == 0) 
            return false;
        return true;
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
            <DateHistoryHeader />
            {isLoading ? (
                <FlatList
                data = {listBMI}
                renderItem = {renderDate}
                >
                </FlatList>
            ): null}

            {!isLoading ? (
               <Image source = {require('../../../../assets/imgs/70780-no-result-found.gif')} style = {{height: '100%', width:'100%'}}/>
            ): null}
            </View>
            {/* <AddFitlerComponent
                    visible = {filter}
                    onCancel = {cancelOpenCalendar}
                    setDateFilter = {callbackFunction}
                    onPress = {getFilter}
                    onCancelFilter  ={onCancelFitler}
            /> */}
            <FillterCalandar
                 visible = {filter}
                 onCancel = {cancelOpenCalendar}
                 setDateFilter = {callbackFunction}
                 onPress = {getFilter}
                 onCancelFilter  ={onCancelFitler}
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

export default ListBMIComponent;