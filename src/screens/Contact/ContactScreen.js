
// import { KeyboardAvoidingView } from 'native-base';
// import React from 'react';
// import { View, Text, StyleSheet, Button, Platform, AsyncStorage } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import { SafeAreaView } from 'react-navigation';
// import fire from '../store/fire';
// export default class ContactScreen  extends React.Component {
   
//     state = {
//         messages: []
//     }

//     get getName() {
//         AsyncStorage.getItem("accountData").then((res) => {
//             account = JSON.parse(res);
//             return account.username;
//           });
//     }

//     get user() {
//         return {
//             _id: fire,
//             name: this.getName()
//         }
//     }

//     componentDidMount() {
//         fire.get(message =>
//             this.setState(previous => ({
//                 message: GiftedChat.append(previous.message, message)
//             })))
//     }
   
//     componentWillUnmount() {
//       fire.off();
//     }

//     render() {

//         const chat  = <GiftedChat messages = {this.state.messages} onSend = {fire.send} user = {this.user}/>
//         if (Platform.OS === 'android') {
//             return (
//                 <KeyboardAvoidingView style = {{flex: 1}} behavior = "padding" keyboardVerticalOffset={30} enabled>
//                     {chat}
//                 </KeyboardAvoidingView>
//             )
//         }

//         return (
//             <SafeAreaView style = {styles.screen}>
//                {chat}
//             </SafeAreaView>
//         )
//     };
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         // justifyContent: 'center',
//         // alignItems: 'center'
//     }
// })

