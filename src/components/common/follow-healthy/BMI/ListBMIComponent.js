import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet,   Animated,
    Dimensions, FlatList, Pressable, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderFilterByDate from "../../HeaderFilterByDate";
import STRING from '../../../../utils/string';
import COLORS from "../../../../assets/colors";
import DateHistory from './DateHistoryBMI';
import { getAllBMI, deleteBMI } from '../../../../store/actions/bmi';
import Moment from 'moment';
import { useFocusEffect } from "@react-navigation/native";
import FillterCalandar from '../../FillterCalandar';
import { SwipeListView } from 'react-native-swipe-list-view';


const ListBMIComponent = (props) =>{

    const [filter, setFilter] =  useState(false);
    const [listBMIStatic, setListBMIStatic] = useState();
    const [listBMI, setListBMI] =  useState([]);
    const [getListFilter, setGetListFilter] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [isBMISelected, setIsBMISelected] = useState("");
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


    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        if (
            value < -Dimensions.get('window').width 
        ) {
            // let list = listBMI;
            // list.pop(key);
            // console.log("key", key);
            // console.log("lits", list)
            // this.animationIsRunning = true;
           
            deleteBMI(isBMISelected).then(res => {
                console.log("delet", res);
                reloadListBMI();
            })
        }else ("khong")
    };

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


    const reloadListBMI = () => {
        getAllListBMI();
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


    const renderDate = ({item}) =>{
        return (
            <TouchableOpacity style = {styles.dateComponent} 
            onPressIn = { () =>{
                console.log("press nhaa")
                setIsBMISelected(item.id);
            }}
            // onPress = {() =>{
            //     console.log("press")
            //     setIsBMISelected(item.id);
            // }}
            onLongPress = {() => {
                console.log("long")
                setIsBMISelected(item.id);
            }}

            // onFocus = {() => {
            //     console.log("focus")
            // }}
            >
                <DateHistory 
            date = {formatDate(item.createdAt)}
            title = {convertTitle(item.tall, item.weigh)}
            data = {item.bmi}
            id = {item.id}
            tall = {item.tall}
            weigh = {item.weigh}
            reloadListBMI = {reloadListBMI}
            />
            </TouchableOpacity>
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
        props.navigation.goBack();
    }

    const renderHiddenItem = () => (
        <View style={styles.btnDelete}>
            <View >
                <Text style={styles.backTextWhite}>Xóa</Text>
            </View>
        </View>
    );
    
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
                // <FlatList
                // data = {listBMI}
                // renderItem = {renderDate}
                // >
                // </FlatList>

                <SwipeListView
                disableRightSwipe
                data={listBMI}
                renderItem={renderDate}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={onSwipeValueChange}
                useNativeDriver={false}
        />
            ): null}

            {!isLoading ? (
               <Image source = {require('../../../../../assets/imgs/70780-no-result-found.gif')} style = {{height: '100%', width:'100%'}}/>
            ): null}
            </View>
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

    backTextWhite: {
        color: '#FFF',
        textAlign: 'right',
        paddingRight: 20
    },

    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },

    rowBack: {
        alignItems: 'center',
       
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },

    backRightBtnRight: {
        backgroundColor: '#E9290F',
        right: 0,
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

    btnDelete : {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#E9290F',
        paddingBottom: 15,
        paddingTop: 15,
        borderRadius: 10,
        marginLeft: 3,
        marginRight: 3,
        justifyContent: 'flex-end'
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