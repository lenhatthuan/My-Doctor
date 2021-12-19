import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import DepartmentList from '../../../components/Department';
const ScheduleDepartmentScreen = props =>{
    return (
        <View style = {styles.screen}>
           <View>
               <View style = {{justifyContent:'center', alignItems:'center', marginBottom: 10, backgroundColor:'#009DAE', padding: 10, borderRadius: 8}}><Text style = {{fontWeight: 'bold', color: 'white', fontSize: 17, textTransform:'uppercase'}}>Đặt lịch khám theo khoa</Text></View>
           <DepartmentList
            onPress={(department) => {
                props.navigation.navigate("BookingDepartment", {
                    department: department
                })
              }}
           />
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ScheduleDepartmentScreen;