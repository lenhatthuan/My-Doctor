import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {collection, onSnapshot, query, where, addDoc} from 'firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  launchImageLibrary,
  launchCamera,
  requestMediaLibraryPermissionsAsync,
} from 'react-native-image-picker';
import {db} from '../../config/firebase';
import SenderMessage from './components/SenderMessage';
import ReceiverMessage from './components/ReceiverMessage';
import HeaderChat from './components/HeaderChat';
import {sendImageToCloud} from '../../store/actions/message';
const windowHeight = Dimensions.get('window').height;
const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const userId = props.route.params.userId;
  const [messageSend, setMessageSend] = useState('');
  const receiverId = props.route.params.doctor.id;
  const name = props.route.params.doctor.fullname;
  const imageUrl = props.route.params.doctor.avatar;
  const messList = React.useRef(FlatList);
  const launchCameraAsync = async () => {
    requestCameraPermission().then(res => {
      if (res) {
        launchCamera(
          {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          },
          response => {
            if (!response.didCancel) {
              const data = {
                name: response.assets[0].fileName,
                type: response.assets[0].type,
                uri:
                  Platform.OS === 'ios'
                    ? response.assets[0].uri.replace('file://', '')
                    : response.assets[0].uri,
              };
              sendImageToCloud(data).then(res => {
                if (res) sendMessage(true, res);
              });
            }
          },
        );
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const pickImageasync = async () => {
    let result = await launchImageLibrary({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      const data = {
        name: result.assets[0].fileName,
        type: result.assets[0].type,
        uri:
          Platform.OS === 'ios'
            ? result.assets[0].uri.replace('file://', '')
            : result.assets[0].uri,
      };
      sendImageToCloud(data).then(res => {
        if (res) sendMessage(true, res);
      });
    }
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'message'),
        where('users', 'in', [
          [userId, receiverId],
          [receiverId, userId],
        ]),
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

  const sendMessage = (isImage = false, url = null) => {
    setMessageSend('');
    addDoc(collection(db, 'message'), {
      senderId: userId,
      receiverId: receiverId,
      createdAt: new Date(),
      updatedAt: new Date(),
      users: [userId, receiverId],
      message: !isImage ? messageSend : '(hình ảnh)',
      isImage: isImage,
      urlImage: url,
    });
    messList.current.scrollToEnd({animating: true});
  };

  const renderItemChat = ({item}) => {
    return item.senderId == userId ? (
      <SenderMessage
        isImage={item.isImage}
        message={item.message}
        url={item.urlImage}
        // createdAt={item.createdAt}
      />
    ) : (
      <ReceiverMessage
        url={item.urlImage}
        isImage={item.isImage}
        message={item.message}
        // createdAt={item.createdAt}
      />
    );
  };

  const emplyChat = () => {
    return (
      <View style={styles.emplyChatContainer}>
        <View style={styles.emplyChat} />
        <Text>Bắt đầu trò chuyện với bác sĩ nào</Text>
      </View>
    );
  };

  const renderFooterEmpty = () => {
    return <View style={styles.blankView}></View>;
  };

  const onPressSendMessage = () => {
    messageSend !== '' ? sendMessage() : null;
  };

  const goback = useCallback(() => {
    props.navigation.goBack();
  }, []);

  return (
    <View style={styles.screen}>
      <HeaderChat onPress={goback} name={name} imageUrl={imageUrl} />
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback style={styles.chatContainer}>
          <FlatList
            style={styles.flatlistContainer}
            ref={messList}
            showsVerticalScrollIndicator={false}
            onLayout={() => messList.current.scrollToEnd({animated: true})}
            data={messages}
            ListEmptyComponent={emplyChat}
            ListFooterComponent={renderFooterEmpty}
            ListFooterComponentStyle={styles.blankView}
            renderItem={renderItemChat}
          />
        </TouchableWithoutFeedback>
        <View style={styles.inputSendContainer}>
          <FontAwesome
            onPress={launchCameraAsync}
            name="camera"
            color={'#C0FFB3'}
            size={24}
          />
          <FontAwesome
            onPress={pickImageasync}
            name="image"
            color={'#C0FFB3'}
            size={24}
          />
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
            onPress={onPressSendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {height: windowHeight * 0.8},
  emplyChatContainer: {justifyContent: 'center', alignItems: 'center'},
  emplyChat: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#aaa',
  },
  blankView: {
    height: windowHeight * 0.1,
  },
  chatContainer: {
    height: windowHeight * 0.9,
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
  },
});

export default ChatScreen;
