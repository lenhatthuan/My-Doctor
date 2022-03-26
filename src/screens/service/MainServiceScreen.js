import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ServiceTap from '../../naviagation/DoctorContact/service';
const MainServiceScreen = (props) => {

    return (
        <View style = {styles.screen}>
            <ServiceTap/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default MainServiceScreen;