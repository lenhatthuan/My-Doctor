import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {styles} from '../../theme/basic';
import profile from '../../config/profile';
import {formatDate} from '../../utils/string-format';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Profile = props => {
  const anim = useRef(new Animated.Value(0)).current;
  const [account, setAccount] = useState({});
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('patientData').then(res => {
        setAccount(JSON.parse(res));
      });
    }, []),
  );

  const info = () => {
    let view = [];
    for (const key in profile) {
      view.push(
        <View style={styles.action}>
          <Icon
            name={profile[key].icon}
            color={profile[key].color}
            type={profile[key].type}
            containerStyle={{flex: 1}}
          />
          <Text style={{flex: 3}}>{profile[key].title}</Text>
          <Text style={{flex: 5}}>
            {key !== 'birthDate' ? account[key] : formatDate(account[key])}
          </Text>
        </View>,
      );
    }
    return view;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Avatar
        containerStyle={{alignSelf: 'center', margin: 20}}
        size={100}
        rounded
        source={
          account.avatar
            ? {
                uri: account.avatar,
              }
            : require('../../assets/logo.png')
        }
      />
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.text_footer}>Thông tin cá nhân</Text>
        {info()}
        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.signIn, {backgroundColor: '#009387'}]}
            onPress={() =>
              props.navigation.navigate('UpdateProfile', {
                avatar: account.avatar,
                fullname: account.fullName,
                address: account.address,
                birthdate: account.birthDate,
                gender: account.gender,
              })
            }>
            <Text style={styles.textSign}>Cập nhật</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ChangePass')}
            style={[styles.signIn, {marginTop: 15}]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
export default Profile;
