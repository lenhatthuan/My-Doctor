import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Animated,
} from 'react-native';
import {Avatar, Icon, Overlay} from 'react-native-elements';
import {styles} from '../../theme/basic';
// import {formatDate} from '../../util/string-format';
import Loading from '../../components/common/Loading';
// import {getPatientById, updateProfile} from '../../store/actions/patient';
import {Calendar} from 'react-native-calendars';
import {launchImageLibrary} from 'react-native-image-picker';
import message from '../../config/message';

const UpdateProfile = props => {
  const [avatar, setAvatar] = useState(props.route.params.avatar);
  const [fullname, setFullname] = useState(props.route.params.fullname);
  const [birthdate, setBirthdate] = useState(props.route.params.birthdate);
  const [gender, setGender] = useState(props.route.params.gender);
  const [address, setAddress] = useState(props.route.params.address);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState(message.infomation);

  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const pickImage = async () => {
    await launchImageLibrary(response => setAvatar(response.uri));
  };

  const save = () => {
    // AsyncStorage.getItem('accountData').then(res => {
    //   const id = JSON.parse(res).accountId;
    //   setIsLoading(true);
    //   updateProfile(id, avatar, fullname, birthdate, gender, address)
    //     .then(result => {
    //       getPatientById(id)
    //         .then(() => props.navigation.goBack())
    //         .catch(err => console.error(err));
    //     })
    //     .catch(err => {
    //       setIsLoading(false);
    //       Alert.alert('Cập nhật thông tin cá nhân không thành công');
    //     });
    // });
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
        source={
          avatar
            ? {
                uri: avatar,
              }
            : require('../../assets/logo.png')
        }>
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
            value={birthdate ? birthdate : null}
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
