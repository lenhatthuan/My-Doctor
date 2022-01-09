import React from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
const LoadingTranComponent = props => {
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        setModalVisible(props.visible);
    })

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
           <View style = {styles.screen}>
           <View style = {{justifyContent:'center'}}>
           <Image source={require('../../../assets/imgs/loadingPage.gif')} style = {{width: 100, height: 100}}/>
           <Text style = {{color: 'white', fontWeight:'bold', fontSize: 18, textAlign:'center', letterSpacing: 1, lineHeight: 40}}>{props.message}</Text>
           </View>
           </View>
           </Modal>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(52, 52, 52, 0.5)"
    }
})

export default LoadingTranComponent;