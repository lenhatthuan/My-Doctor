import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
const FollowHeathyScreen = props =>{
    return (
        <View style = {styles.screen}>
           <View>
           <Text>
           FollowHeathyScreen
            </Text>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default FollowHeathyScreen;