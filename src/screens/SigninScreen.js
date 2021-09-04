import React , {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-number-input'
import COLORS from '../../assets/colors';
import {signin} from '../store/actions/account';
import { getPatientById } from '../store/actions/patient';

const SigninScreen = (props) =>{
    const [titleAlert, setTitleAlert] =  useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    function checkLogin (){
        console.log("press login")
        let username = phone;
        let pass = password;
        signin(username, pass).then(data =>{
            if(data.count == 1){
                console.log ("login hear")
                sendOTP(data.account.id)
            }else{
                Alert.alert(
                    "Thông báo",
                    "Đăng nhập không thành công!",
                    [ {
                     text: "OK",
                     onPress: () => console.log("Cancel Pressed"),
                     style: "cancel"
                   }]
                )
            }
            
         })
    } 

    const sendError = ()=>{
        
    }

    const setPasswordInput = (text) =>{
        setPassword(text)
    }

    const setPhoneNumber = phoneInput =>{
        setPhone(phoneInput)
    }

    
    const sendOTP = (id) =>{
        // props.navigation.navigate(
        //    'OTPAuth', {phone: phone, pass: password, patientId: id}
        // )
        getPatientById(id).then(result =>{
            props.navigation.push(
                'Home'
             )
        })      
    }

    return (
        <SafeAreaView style = {styles.signinScreen}>
            <View style = {styles.signinComponent}>
           <Text style = {styles.titleText}> Xin chào, </Text>
            <Text> Đăng nhập bằng số điện thoại và mật khẩu của bạn! </Text>
          <View style = {styles.phoneInput}>
          <PhoneInput 
             international
             countryCallingCodeEditable={false}
             defaultCode="VN"
            value = {phone}
            onChangeFormattedText = {(phoneInput) => {setPhoneNumber(phoneInput)}}
            />
            <TextInput placeholder = 'Nhập mật khẩu'   style = {styles.textInput} value = {password} onChangeText = {(text) => setPasswordInput(text)}></TextInput>
          </View>
            <Button title = 'Đăng nhập' color = {COLORS.TeaGreen} onPress={() => checkLogin()}/>
            </View>
           <View style = {styles.btnSignup}>
           <Text onPress = {() =>{
               props.navigation.navigate('Signup')
            }}>Đăng ký tài khoản</Text>
           </View>
           <View style = {styles.btnSignup}>
           <Text onPress = {() =>{
               props.navigation.navigate('Home')
            }}>Trang chủ</Text>
           </View>
        </SafeAreaView>
    )
}

SigninScreen.navigationOptions = {
    headerTitle: 'Sign in',
    headerStyle:{
        backgroundColor: COLORS.TeaGreen
    }
}

const styles = StyleSheet.create({
    signinScreen:{
        flex: 1,
        justifyContent: 'center',
    },

    signinComponent:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    titleText:{
        color: COLORS.BayofMany,
        fontWeight:'bold',
        marginBottom: 10
    },
    phoneInput: {
        marginTop: 20
    },
    textInput:{
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        backgroundColor:COLORS.Whisper,
        padding: 15
    },
    btnSignup:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
    }
})
export default SigninScreen;