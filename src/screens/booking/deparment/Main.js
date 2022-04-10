import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Department from '../../../naviagation/department/booking';
const MainDepartmentScreen = (props) => {

    return (
        <View style = {styles.screen}>
            <Department/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default MainDepartmentScreen;