import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const NavComponent = props => {
    
    const goToHomeScreen = () =>{
        console.log("home ne")
        props.navigation.navigate('Signin')
    }
  return (

    <View style={styles.nav}>
      <View style={styles.buttonNav} onPress = {goToHomeScreen}>
        <Text style = {styles.text}>Trang chủ</Text>
      </View>
      <View style={styles.buttonNav}>
      <Text style = {styles.text}>Tư vấn BS</Text>
      </View>
      <View style={styles.buttonNav}>
      <Text style = {styles.text}>Đặt lịch khám</Text>
      </View>
      <View style={styles.buttonNav}>
      <Text style = {styles.text}>Theo dõi SK</Text>
      </View>
      <View style={styles.buttonNav}>
      <Text style = {styles.text}>Cá nhân</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
      flex: 1,
    justifyContent: "space-between",
    flexDirection: 'row',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0, 
    backgroundColor: '#fff'
  },
  buttonNav: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
      fontSize: 12
  }
});

export default NavComponent;
