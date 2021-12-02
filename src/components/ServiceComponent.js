import React from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import {balanceFormat} from '../utils/string-format';
import AlertDoctorService from '../components/common/AlertDoctorService';
const ServiceComponent = props =>{

    const [isAddModel, setIsAddModel] = React.useState(false);
    const cancelGoalApplicationHandler = () => {
        setIsAddModel(false);
      };

    const changeFormat = () => {
        return balanceFormat(props.price);
    }

    const gotoPayment = () => {
      props.gotoPayment();
    }

    const setRegistration = (res) => {
      props.setRegistration(res);
    }

    const setPrice = (price) =>{
      props.setPrice(price);
    }

    return (
        <View style = {styles.screen}>
           <View style = {styles.header}>
           <Text style = {{fontSize: 15, fontWeight: "bold"}}>
             {props.name}
            </Text>
            <Text style = {{fontSize: 12, color: "#009387", marginTop: 5}}>
               {props.description}
            </Text>
           </View>
           <View style  = {{marginTop: 5, justifyContent: 'space-between', alignItems: 'center', flex: 1, flexDirection: 'row', paddingRight: 10}}>
              <Text style = {{fontWeight: '800', fontSize: 20, color: '#009DAE', marginTop: 5}}>
                {changeFormat()}
              </Text>
              <Pressable style = {{backgroundColor: '#FF5403', padding: 5, borderRadius: 5}}
              onPress = {() => {
                setIsAddModel(true);
              }}>
                   <Text style = {{color: 'white', fontWeight: 'bold', letterSpacing: 0.5}}>Đăng ký</Text></Pressable>
           </View>
          <AlertDoctorService
                 visible={isAddModel}
                 onCancel = {cancelGoalApplicationHandler}
                 name = {props.name}
                 description = {props.description}
                 doctorId = {props.doctorId}
                 serviceId = {props.serviceId}
                 payment = {gotoPayment}
                 duration = {props.duration}
                 nameDoctor = {props.nameDoctor}
                 price = {props.price}
                 setPrice = {setPrice}
                 setRegistration = {setRegistration}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {

    },

    screen: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#A9E4D7',
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    }
})

export default ServiceComponent;