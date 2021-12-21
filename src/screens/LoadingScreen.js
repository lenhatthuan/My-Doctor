import React, { Component } from 'react';
import { Animated } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigator, NavigationActions, DrawerNavigator } from 'react-navigation';

class LoadingScreen extends Component {

    state = {
        LogoAminated: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false
    }

    load(){
        this.props.navigation.navigate("Signin");
    }
     componentDidMount =()=>{
        const{LogoAminated, LogoText} = this.state;
        Animated.parallel([
            Animated.spring(LogoAminated, {
                toValue:1,
                tension: 10,
                friction: 2,
                duration: 1000,
                useNativeDriver:false
            }).start(),
            Animated.timing(LogoText, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
                
            }),
        ]).start(() => {
            loadingSpinner:true
        })

        setTimeout( () => {this.load()}, 3000);    
      

    }

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style = {styles.screen}>
            <Animated.View style = {{
                opacity: this.state.LogoAminated,
                top: this.state.LogoAminated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [80, 0]
                })
            }}>
            <Image style = {styles.image} source = {{uri:'https://res.cloudinary.com/yenltn/image/upload/v1636559561/my-doctor/mdoctor_hsubsd.png'}}/>
            </Animated.View>
            <Animated.View style= {{opacity: this.state.LogoText}}>
            <Text style = {styles.text_header}>We will help if neccessary!</Text>
            </Animated.View>
        </View>
       )
  }
}

const styles = StyleSheet.create({
    text_header: {
        color: '#009387',
        fontWeight: 'bold',
        fontSize: 14
    },

    image: {
        height: 100,
        width: 200
    }, 

    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})

export default LoadingScreen;