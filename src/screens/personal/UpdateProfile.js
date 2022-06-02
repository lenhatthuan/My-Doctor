import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import {Avatar, Icon, Overlay} from 'react-native-elements';
import {styles} from '../../theme/basic';
import {formatDate} from '../../utils/string-format';
import Loading from '../../components/common/Loading';
import {
  getPatientById,
  updateAvatar,
  updateProfile,
} from '../../store/actions/patient';
import {Calendar} from 'react-native-calendars';
import {launchImageLibrary} from 'react-native-image-picker';
import message from '../../config/message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateProfile = props => {
  const [avatar, setAvatar] = useState({uri: props.route.params.avatar});
  const [fullname, setFullname] = useState(props.route.params.fullname);
  const [birthdate, setBirthdate] = useState(props.route.params.birthdate);
  const [gender, setGender] = useState(props.route.params.gender);
  const [address, setAddress] = useState(props.route.params.address);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const pickImage = async () => {
    await launchImageLibrary(
      {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      },
      response => {
        setAvatar(response?.assets[0]);
      },
    );
  };

  const save = () => {
    const data = {
      name: avatar.fileName,
      type: avatar.type,
      uri:
        Platform.OS === 'ios' ? avatar.uri.replace('file://', '') : avatar.uri,
    };
    AsyncStorage.getItem('accountData').then(res => {
      const id = JSON.parse(res).accountId;
      setIsLoading(true);
      updateAvatar(data, id)
        .then(res => {
          if (res.count !== 0) {
            updateProfile(
              id,
              res.patient.avatar,
              fullname,
              birthdate,
              gender,
              address,
            )
              .then(result => {
                getPatientById(id)
                  .then(() => props.navigation.goBack())
                  .catch(err => console.error(err));
              })
              .catch(err => {
                setIsLoading(false);
                setType(message.error);
                setContent('Cập nhật thông tin cá nhân không thành công');
                setVisible(true);
              });
          } else {
            setIsLoading(false);
            setType(message.error);
            setContent('Cập nhật thông tin cá nhân không thành công');
            setVisible(true);
          }
        })
        .catch(err => {
          setIsLoading(false);
          setType(message.error);
          setContent('Cập nhật thông tin cá nhân không thành công');
          setVisible(true);
        });
    });
  };
  return (
    <View style={styles.container}>
      <Overlay
        isVisible={isCalendar}
        onBackdropPress={() => setIsCalendar(false)}>
        <Calendar
          current={birthdate}
          maxDate={new Date()}
          onDayPress={day => {
            setBirthdate(day.dateString);
            setIsCalendar(false);
          }}
        />
      </Overlay>
      <Loading visible={isLoading} message="Cập nhật..." />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Avatar
        containerStyle={{alignSelf: 'center', marginBottom: 20}}
        size={100}
        rounded
        source={{
          uri: avatar.uri,
        }}>
        <Avatar.Accessory size={25} onPress={pickImage} />
      </Avatar>
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
        <Text style={styles.text_footer}>Họ và tên</Text>
        <View style={styles.action}>
          <Icon name="person" color="#009387" />
          <TextInput
            value={fullname}
            placeholder="Your fullname"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="words"
            onChangeText={text => setFullname(text)}
          />
        </View>
        <Text style={styles.text_footer}>Giới tính</Text>
        <View style={styles.action}>
          <Icon
            name="transgender"
            type="font-awesome"
            color="#009387"
            onPress={() =>
              gender === 'nam' ? setGender('nữ') : setGender('nam')
            }
          />
          <TextInput
            value={gender}
            placeholder="Your gender"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={text => setGender(text)}
            editable={false}
          />
        </View>
        <Text style={styles.text_footer}>Ngày sinh</Text>
        <View style={styles.action}>
          <Icon
            name="today"
            color="#009387"
            onPress={() => setIsCalendar(true)}
          />
          <TextInput
            value={birthdate ? formatDate(birthdate) : null}
            placeholder="dd/MM/yyyy"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={text => setBirthdate(text)}
            editable={false}
          />
        </View>

        <Text style={styles.text_footer}>Địa chỉ</Text>
        <View style={styles.action}>
          <Icon name="place" color="#009387" />
          <TextInput
            value={address}
            placeholder="Your address"
            placeholderTextColor="#666666"
            style={styles.textInput}
            onChangeText={text => setAddress(text)}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {backgroundColor: '#009387', marginTop: -20},
            ]}
            onPress={save}
            disabled={!(fullname && birthdate && gender && address)}>
            <Text style={styles.textSign}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default UpdateProfile;
