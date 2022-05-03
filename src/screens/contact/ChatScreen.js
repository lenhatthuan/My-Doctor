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
  TouchableWithoutFeedback,
  Platform,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {db} from '../../config/firebase';
import SenderMessage from './components/SenderMessage';
import ReceiverMessage from './components/ReceiverMessage';
import HeaderChat from './components/HeaderChat';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [messageSend, setMessageSend] = useState('');
  const receiverId = props.route.params.doctor.id;
  const name = props.route.params.doctor.fullname;
  const imageUrl = props.route.params.doctor.avatar;
  useEffect(() => {
    AsyncStorage.getItem('id').then(id => {
      setUserId(id.toString());
    });
  }, []);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'message'),
        where('users', 'array-contains-any', [receiverId, userId]),
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
        messList.current.scrollToEnd({animated: true});
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
    messList.current.scrollToEnd({animating: true});
  };
  return (
    <View style={styles.screen}>
      <HeaderChat
        onPress={() => {
          props.navigation.goBack();
        }}
        name={name}
        imageUrl={imageUrl}
      />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback style={styles.chatContainer}>
          <FlatList
            style={{height: windowHeight * 0.8}}
            ref={messList}
            showsVerticalScrollIndicator={false}
            onLayout={() => messList.current.scrollToEnd({animated: true})}
            data={messages}
            ListFooterComponent={() => <View style={styles.blankView}></View>}
            ListFooterComponentStyle={styles.blankView}
            renderItem={({item}) => {
              console.log('item chat 110, ', item);
              return item.senderId === userId ? (
                <SenderMessage
                  message={item.message}
                  // createdAt={item.createdAt}
                />
              ) : (
                <ReceiverMessage
                  message={item.message}
                  // createdAt={item.createdAt}
                />
              );
            }}></FlatList>
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
          <FontAwesome
            name="send-o"
            color={'#C0FFB3'}
            size={24}
            onPress={() => {
              messageSend !== '' ? sendMessage() : null;
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  blankView: {
    height: windowHeight * 0.1,
  },
  chatContainer: {
    // flex: 1,
    height: windowHeight * 0.9,
    // backgroundColor: 'red'
  },

  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  txtInputSend: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#C0FFB3',
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  inputSendContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    // height: windowHeight * 0.1,
  },
});

export default ChatScreen;
