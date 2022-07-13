import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SearchBar, Avatar} from 'react-native-elements';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllByPatientId} from '../../store/actions/doctor-registration';
import {getDoctor} from '../../store/actions/doctor';
import {db} from '../../config/firebase';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import HeaderBackComponent from '../../components/common/HeaderBackComponent';
import {shortMessage} from '../../utils/string-format';

const ListChatScreen = props => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [listSearchDoctor, setListSearchDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('id').then(id => {
      setUserId(id.toString());
    });
  }, []);
  useEffect(() => {
    setIsloading(true);
    setDoctors([]);
    setListSearchDoctor([]);
    let doctorTemp = [];
    AsyncStorage.getItem('id').then(id => {
      getAllByPatientId(id).then(res => {
        if (res) {
          res.forEach(res => {
            if (res.status == 'CONFIRMED') {
              getDoctor(res.doctorId).then(res => {
                doctorTemp.push(res);
                onSnapshot(
                  query(
                    collection(db, 'message'),
                    where('users', 'in', [
                      [res.id, id],
                      [id, res.id],
                    ]),
                  ),
                  snapshot => {
                    res.lastMessage = snapshot?.docs
                      .map(mess => mess.data())
                      .sort(function (x, y) {
                        return y.createdAt - x.createdAt;
                      })[0]?.message;
                    const updatedList = doctorTemp.filter(
                      item => item.id !== res.id,
                    );
                    updatedList.push(res);
                    setDoctors(updatedList);
                    setListSearchDoctor(updatedList);
                    setIsloading(false);
                  },
                );
              });
            }
          });
        }
      });
    });
  }, []);

  const gotoChatDetail = doctor => {
    props.navigation.navigate('ChatDetailScreen', {
      doctor: doctor,
      userId: userId,
    });
  };
  const EmptyChat = () => (
    <SkeletonPlaceholder>
      <View style={styles.emplyContainer}>
        <View style={styles.imgEmpty}></View>
        <View style={styles.txtEmptyContainer}>
          <View style={styles.txtEmpty}></View>
          <View style={styles.txtEmptyMess}></View>
        </View>
      </View>
    </SkeletonPlaceholder>
  );

  const renderItemChat = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          gotoChatDetail(item);
        }}
        style={styles.chatItemContainer}>
        <View>
          <Avatar size="large" rounded source={{uri: item.avatar}} />
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginLeft: 5,
            marginRight: 5,
            paddingLeft: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: '500'}}>{item.fullname}</Text>
          <Text style={{fontSize: 13, fontWeight: '400', marginTop: 5}}>
            {shortMessage(item.lastMessage, 30)}
          </Text>
        </View>
      </Pressable>
    );
  };
  const renderDoctorEmptyChat = () => {
    return isLoading ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
        <EmptyChat />
      </ScrollView>
    ) : (
      <View style={styles.emptyListContainer}>
        <Text>Bạn chưa có cuộc hội thoại nào</Text>
      </View>
    );
  };

  const findDoctorByName = async text => {
    if (doctors) {
      let listDoctor = [];
      listDoctor = await doctors.filter(doctor =>
        doctor.fullname.toLowerCase().includes(text.toLowerCase()),
      );
      if (Object.keys(listDoctor).length > 0) {
        setListSearchDoctor(listDoctor);
      } else setListSearchDoctor('');
    } else setDoctors(doctors);
  };
  return (
    <View style={styles.screen}>
      <HeaderBackComponent
        onBack={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.screen}>
        <View style={styles.searchContainer}>
          <View
            style={{
              width: '100%',
              borderRadius: 8,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 10,
              marginTop: 15,
            }}>
            <SearchBar
              round
              inputContainerStyle={{backgroundColor: '#EEF2FF'}}
              leftIconContainerStyle={{backgroundColor: '#EEF2FF'}}
              inputStyle={{backgroundColor: '#EEF2FF'}}
              containerStyle={styles.searchContainerStyle}
              searchIcon={{size: 24}}
              style={styles.searchBar}
              placeholder="Tên bác sĩ"
              onClear={text => {
                setName('Tên bác sĩ...');
                findDoctorByName('');
              }}
              onChangeText={text => {
                setName(text);
                findDoctorByName(text);
              }}
              value={name}
            />
          </View>
        </View>
        <View style={styles.listChatContainer}>
          <View style={styles.txtTitleContainer}>
            <Entypo name="slideshare" size={24} color="#93FFD8" />
            <Text style={styles.txtTitle}>Danh sách bác sĩ</Text>
          </View>
          <View style={styles.listChat}>
            <FlatList
              data={listSearchDoctor}
              ListEmptyComponent={renderDoctorEmptyChat}
              renderItem={renderItemChat}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerStyle: {
    backgroundColor: '#EEF2FF',
    justifyContent: 'space-around',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 0,
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listChatContainer: {},
  txtTitle: {paddingLeft: 5, paddingRight: 5, fontWeight: '500', fontSize: 15},
  txtTitleContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  listChat: {
    padding: 10,
  },
  emplyContainer: {
    width: 400,
    height: 100,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  txtEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imgEmpty: {
    height: 70,
    width: 70,
    borderRadius: 70,
  },
  txtEmpty: {
    width: 250,
    marginLeft: 5,
    marginRight: 5,
    height: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  txtEmptyMess: {
    width: 150,
    marginLeft: 5,
    marginRight: 5,
    height: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  searchBar: {
    borderRadius: 8,
    paddingLeft: 10,
    width: '100%',
    fontSize: 15,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chatItemContainer: {
    width: '95%',
    height: 100,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListChatScreen;
