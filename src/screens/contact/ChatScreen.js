import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
} from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {db, firestore} from '../../config/firebase';
import SenderMessage from './components/SenderMessage';
import ReceiverMessage from './components/ReceiverMessage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [messageSend, setMessageSend] = useState('');
  const receiverId = '099f459d-561c-400c-8f99-271e9465efe4';
  // const messageCollection = firestore().collection('message');
  useEffect(() => {
    AsyncStorage.getItem('id').then(id => {
      setUserId(id.toString());
      console.log('userId', id);
    });
    //setUserId(AsyncStorage.getItem("id"));
  }, []);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'message'),
        where('users', 'array-contains-any', [receiverId, userId]),
        // orderBy('createdAt', 'asc'),
      ),
      snapshot => {
        setMessages(
          snapshot?.docs
            .map(mess => mess.data())
            .sort(function (x, y) {
              return x.createdAt - y.createdAt;
            }),
        );
      },
    );
  }, [db]);

  const messList = React.useRef(FlatList);


  React.useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      if (messList.current && messages && messages.length > 0) {
        messList.current.scrollToEnd({ animated: true });
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };

   }, [messages]);


  const sendMessage = () => {
      setMessageSend('');
    addDoc(collection(db, 'message'), {
      senderId: userId,
      receiverId: receiverId,
      createdAt: new Date(),
      updatedAt: new Date(),
      users: [userId, receiverId],
      message: messageSend,
    });
    messList.current.scrollToEnd({ animating: true });
  
  };
  return (
    <View style={styles.screen}>
        <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
        >
      <TouchableWithoutFeedback  style={styles.chatContainer}>
      
        <FlatList
        style = {{height: windowHeight*0.8}}
          ref = {messList}
          showsVerticalScrollIndicator={false}
          onLayout={() => messList.current.scrollToEnd({ animated: true })}
          data={messages}
          ListFooterComponent = {() => (
            <View style = {{height: 50}}></View>
          )}
          ListFooterComponentStyle = {{height: 50}}
          //onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
          //keyExtractor={item => }
          renderItem={({item}) =>
            item.senderId === userId ? (
              <SenderMessage message={item.message} />
            ) : (
              <ReceiverMessage message={item.message} />
            )
          }></FlatList>
          {/* <View style = {styles.blankView}></View> */}
      </TouchableWithoutFeedback>
      <View style={styles.inputSendContainer}>
        <TextInput
          style={styles.txtInputSend}
          placeholder={'gửi tin nhắn nha'}
          value={messageSend}
          onChangeText={text => {
            setMessageSend(text);
          }}
        />
        <AntDesign
          name="right"
          size={24}
          onPress={() => {
            sendMessage();
          }}
        />
       
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  blankView: {
    height : windowHeight*0.1
  },
  chatContainer: {
    // flex: 1,
    height: windowHeight*0.9,
    // backgroundColor: 'red'
  },

  screen: {
    height: windowHeight,
    backgroundColor: '#F2F2F2',
    
  },
  txtInputSend: {
    flex: 1,
  
  },
  inputSendContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    height: windowHeight*0.1
  },
});

export default ChatScreen;
