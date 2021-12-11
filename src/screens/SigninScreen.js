import React, {useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from "react-native-phone-number-input";
import { signin } from "../store/actions/account";
import { getPatientById } from "../store/actions/patient";
import LoadingComponent from '../components/common/LoadingComponent';

const SignInScreen = (props) => {
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [isLoading, setIsLoading] = useState(false);
function checkLogin() {
  let username = phone;
  let pass = password;
  setIsLoading(true);
  console.log("login")
  signin(username, pass).then((data) => {
    if (data.count == 1) {
      sendOTP(data.account.id);
    } else {
        setIsLoading(false);
      Alert.alert("Thông báo", "Đăng nhập không thành công!", [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
  });
}

const sendError = () => {};

const setPasswordInput = (text) => {
  setPassword(text);
};

const setPhoneNumber = (phoneInput) => {
  setPhone(phoneInput);
};

const sendOTP = (id) => {
  // props.navigation.navigate(
  //    'OTPAuth', {phone: phone, pass: password, patientId: id}
  // )
  getPatientById(id).then((result) => {
       setIsLoading(false);
    props.navigation.navigate("BottomTab");
  });
};


    const loginHandle = (userName, password) => {


        if ( userName.length == 0 || password.length == 0 ) {
            Alert.alert('Lỗi đầu vào!', 'Số điện hoặc password không được để trống.', [
                {text: 'Okay'}
            ]);
            return;
        }
        checkLogin();
    }

    return (
      
      <View style={styles.container}>
            <LoadingComponent visible = {isLoading} message = "Login..."/>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: 'white'
            }]}
        >
            <Text style={[styles.text_footer, {
                color: '#009387'
            }]}>Phone</Text>
            <View style={styles.action}>

               <PhoneInput
                style={[styles.textInput, {
                  color: "#009387"
              }]}
                  international
                  countryCallingCodeEditable={false}
                  defaultCode="VN"
                  value={phone}
                  onChangeFormattedText={(phoneInput) => {
                    setPhoneNumber(phoneInput);
                  }}
                />
                  </View>
            

            <Text style={[styles.text_footer, {
                color: '#009387',
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color='#009387'
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: "#009387"
                    }]}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(text) => setPasswordInput(text)}
                />
            </View>
           
            <TouchableOpacity  onPress={() => {
            props.navigation.navigate("ForgotPass");
          }}>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginTop: 15,
                      backgroundColor:'#009387'
                    }]}
                    onPress={() => {loginHandle( phone, password )}}
                >
              
                    <Text style={[styles.textSign, {
                        color:'#fff',
                       
                    }]}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Signup')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
