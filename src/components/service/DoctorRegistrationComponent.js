import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getDoctor} from '../../store/actions/doctor';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const DoctorRegistrationComponent = props => {
  const [doctor, setDoctor] = React.useState(null);

  const navigateChatWithDoctor = id => {
    props.navigateChatWithDoctor(id);
  };

  const gotoDoctor = () => {
    props.gotoDoctorProfile(doctor);
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

  React.useEffect(() => {
    getDoctor(props.doctorId).then(res => {
      setDoctor(res);
    });
  }, []);
  return (
    <>
      {doctor != null ? (
        <TouchableOpacity
          onPress={gotoDoctor}
          style={{
            flexDirection: 'row',
            padding: 10,
            width: '100%',
            backgroundColor: 'white',
            marginBottom:10
          }}>
          <Avatar size="large" rounded source={{uri: doctor.avatar}} />

          <View style={{marginLeft: 20}}>
            <Text style={{fontWeight: 'bold'}}>{doctor.fullname}</Text>

            <Text style={{textAlign: 'center'}}>
              Chuyên khoa {doctor.department}
            </Text>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#04293A',
                width: '100%',
                marginTop: 5,
              }}></View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Pressable>
                <Image
                  source={require('../../../assets/imgs/call.png')}
                  style={{height: 20, width: 20, margin: 10}}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigateChatWithDoctor('hihi');
                }}>
                <Image
                  source={require('../../../assets/imgs/message.png')}
                  style={{height: 20, width: 20, margin: 10}}
                />
              </Pressable>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <EmptyChat />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#95D1CC',
    padding: 10,
    width: '100%',
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
});

export default React.memo(DoctorRegistrationComponent);
