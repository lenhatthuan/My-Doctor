import React , {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import PhoneInput from 'react-native-phone-number-input'
import COLORS from '../../assets/colors';

const SigninScreen = (props) =>{
    const [titleAlert, setTitleAlert] =  useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [phone, setPhone] = useState('')

    const checkLogin = (username, password) =>{
        // setIsLogin(true);
        // if(isLogin) sendOTP();
        // else sendError;
     
    }

    const sendError = ()=>{
        
    }

    const setPhoneNumber = phoneInput =>{
        setPhone(phoneInput)
    }

    
    const sendOTP = () =>{
        props.navigation.navigate(
           'OTPScreen', {phone: phone}
        )
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
            <TextInput placeholder = 'Nhập mật khẩu'   style  = {styles.textInput}></TextInput>
          </View>
            <Button title = 'Đăng nhập' color = {COLORS.TeaGreen} onPress = {checkLogin}/>
            </View>
            <Text onPress = {() =>{
               props.navigation.navigate('Signup')
            }}>Đăng ký tài khoản</Text>
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
        justifyContent: 'flex-start',
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
    }
})
export default SigninScreen;