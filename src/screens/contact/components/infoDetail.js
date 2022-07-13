import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const InfoDetail = ({message}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <View style={styles.componentChat}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <AntDesign name={'heart'} color={'#FF7373'} size={20} />
            <Text style={styles.txt}>{message.heartBeat}</Text>
          </View>
          <View style={styles.rowContainer}>
            <AntDesign name={'fork'} color={'#0888E4'} size={20} />
            <Text style={styles.txt}>{message.title}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.txtHA}>
                {message.status ?? 'HA Bình thường'}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text>Đo ngày: </Text>
            <Text style={styles.txt}>{message.time}</Text>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message.message}</Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(InfoDetail);

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#0ED3EE',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 20,
  },
  message: {
    color: 'white',
    fontSize: 15,
  },
  componentChat: {},
  txtHA: {
    fontWeight: 'bold',
    color: '#4175FB',
  },
  statusContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0888E4',
    backgroundColor: '#ADDBF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  txt: {
    fontWeight: '600',
    marginHorizontal: 5,
  },
  container: {
    marginVertical: 20,
    backgroundColor: '#DBFFFB',
    borderRadius: 8,
    borderLeftWidth: 6,
    borderLeftColor: '#1DC6CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 320,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
