import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,  FlatList, AsyncStorage, Pressable, Image} from 'react-native';
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
import { convertTitle, formatDate, formatDateTime, formatTime } from '../../../utils/string-format';
import FillterCalandar from '../../common/FillterCalandar';
import { getListDoctorService } from '../../../store/actions/doctor';

const ListHeartComponent = (props) =>{

    const [filter, setFilter] =  useState(false);
    const [listHeart, setListHeart] =  useState([]);
    const [getListFilter, setGetListFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState(new Date());
    const [listHeartStatic, setListHeartStatic] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [doctors, setDoctors] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
          setIsloading(checkList());
        }, [])
      );

    useEffect(() =>{
        getListDoctor();
    },[])

    const getListDoctor = () => {
        AsyncStorage.getItem("id").then(id => {
            getListDoctorService(id, "CONFIRMED").then(res => {
                setDoctors(res);
            })
        })
    }
    
      const checkList = () => {
        if (listHeart.length == 0) 
            return false;
        return true;
    }

    const openCalendar = () =>{
        setFilter(true);
    }

    const cancelOpenCalendar = () =>{
        setFilter(false);
    }

    const onCancelFitler = () => {
        setIsloading(true);
        setListHeart(listHeartStatic);
        setFilter(false);
    }


    const callbackFunction  = (date) => {
        setDateFilter(date);
        getAllListHeartByFilterDate(date);
        cancelOpenCalendar();
    }

    const getFilter = () =>{
        setGetListFilter(true);
       
    }
    
    useEffect(() => {
        getAllListHeart();
    }, [])

    const getAllListHeart= async() => {
        let id = await AsyncStorage.getItem("id");
        await getAllHeart(id).then(heart => {
            if(heart) {
                setIsloading(true);
                setListHeart(heart);
                setListHeartStatic(heart);
            }
        })
    }

    const getAllListHeartByFilterDate = async(date) => {
        let heartFilterSuccess = [];
        listHeartStatic.forEach(bmiItem => {
            if(formatDate(bmiItem.createdAt) == formatDate(date))
            heartFilterSuccess.push(bmiItem);
        });
        heartFilterSuccess.length > 0 ? setIsloading(true) : setIsloading(false);
        setListHeart(heartFilterSuccess);
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
        return (<HoldItem items = {menuItems} menuAnchorPosition="bottom-right">
        </HoldItem>);
            }}>
                <DateHistoryHeart
            time = {formatDateTime(item.createdAt)}
            heartBeat = {item.heartBeat}
            title = {convertTitle(item.systole, item.diastole)}
            status = {statusHA(item.diastole, item.systole)}
            doctors = {doctors}
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
        // props.navigation.navigate("HeartHistory"); tạm thời tắt
        props.navigation.navigate("FollowHeathy");
        
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
           {isLoading ? ( <FlatList
            data = {listHeart}
            renderItem = {renderDate}
            >

            </FlatList>): null}

            {!isLoading ? ( <Image source = {require('../../../../assets/imgs/not-found-heart.gif')} style = {{height: '100%', width: '100%'}}/>): null}
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

export default ListHeartComponent;