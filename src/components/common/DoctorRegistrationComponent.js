import React from 'react';
import ContentLoader, {Rect, Circle } from 'react-content-loader/native';
import { Facebook } from 'react-content-loader/native';
import { View, Text, StyleSheet, Image, LogBox } from 'react-native';
import { Avatar } from "react-native-elements";
import { getDoctor } from '../../store/actions/doctor';
const DoctorRegistrationComponent = props =>{

    const MyFacebookLoader = () => <Facebook />
    const [doctor, setDoctor] = React.useState();
    LogBox.ignoreLogs([
        'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
      ]);

    React.useEffect(() =>{
        getDoctor(props.doctorId).then(res => {
            setDoctor(res);
       
    })}, [])
    return (
        <>
        {/* // <View style = {styles.screen}> */}
           {doctor != null ? <View style = {{flexDirection: 'row', padding: 10, width: "100%", backgroundColor:'white'}}>
           <Avatar size="large" rounded source={{ uri: doctor.avatar }} />
           
           <View style={{ marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold" }}>{doctor.fullname}</Text>
         
          <Text style = {{textAlign:'center'}}>Chuyên khoa {doctor.department}</Text>

          <View style = {{borderWidth: 0.5, borderColor: '#04293A', width: '100%', marginTop: 5}}> 
          </View>
          <View style = {{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
             
               <Image source={require('../../../assets/imgs/call.png')} style = {{height: 20, width: 20, margin: 10}}/>  
               <Image source={require('../../../assets/imgs/message.png')} style = {{height: 20, width: 20, margin: 10}}/>    
                    
          </View>
          </View>
           </View>: (
             MyFacebookLoader()
           
           )}
     {/* </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#95D1CC',
        padding: 10,
        width: '100%'
    }
})

export default DoctorRegistrationComponent;