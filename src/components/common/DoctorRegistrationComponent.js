import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Avatar } from "react-native-elements";
import { getDoctor } from '../../store/actions/doctor';
const DoctorRegistrationComponent = props =>{

    const [doctor, setDoctor] = React.useState();
    React.useEffect(() =>{
        getDoctor(props.doctorId).then(res => {
            setDoctor(res);
       
    })})
    return (
        <View style = {styles.screen}>
           {doctor != null ? <View>
           <Avatar size="large" rounded source={{ uri: doctor.avatar }} />
           <View style={{ marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold" }}>{doctor.fullname}</Text>
          <Text>Chuyên khoa {doctor.department}</Text>
          </View>
           </View>: null}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default DoctorRegistrationComponent;