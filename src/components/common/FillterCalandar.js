import React, {useState, useEffect} from 'react';
import {View, Pressable, Text, StyleSheet, Modal} from 'react-native';
import STRING from '../../utils/string';
import BtnAddComponent from './BtnAddComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';
import {formatDateCalandar} from '../../utils/string-format';

const FillterCalandar = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(formatDateCalandar(new Date()));
  const [listSelectedDate, setListSelectedDate] = useState({
    [date]: {selected: true},
  });

  useEffect(() => {
    setModalVisible(props.visible);
  });

  const onPress = () => {
    props.setDateFilter(date);
    props.onPress();
  };

  const onCanCel = () => {
    props.onCancel();
  };

  const onCanCelFilter = () => {
    props.onCancelFilter();
  };

  const getSelectedDayEvents = day => {
    console.log('change date' + day.dateString);
    setDate(day.dateString);
    setListSelectedDate({[day.dateString]: {selected: true}});
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Bạn có chắc thoát.');
        setModalVisible(!modalVisible);
      }}>
      <Pressable
        style={styles.view}
        onPress={() => {
          onCanCel();
        }}>
        <Pressable style={styles.main} onPress={() => {}}>
          <View style={styles.header}>
            <Pressable
              style={styles.iconHeader}
              onPress={() => {
                onCanCel();
              }}>
              <FontAwesome name="remove" size={24} color="black" />
            </Pressable>
            <Pressable
              style={styles.viewTxtHeader}
              onPress={() => {
                onCanCelFilter();
              }}>
              <Text style={styles.txtHeader}>Bỏ lọc</Text>
            </Pressable>
          </View>
          {/* <View style = {styles.body}> */}
          {/* cho nay */}
          <Calendar
            //  theme={{
            //     textSectionTitleDisabledColor: '#d9e1e8'
            //   }}
            //   markingType={'period'}
            //   current={currentDate}

            scrollEnabled={true}
            horizontal={true}
            showScrollIndicator={true}
            disableMonthChange={true}
            onDayPress={day => {
              getSelectedDayEvents(day);
            }}
            markedDates={listSelectedDate}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              todayTextColor: '#57B9BB',
              todayButtonFontWeight: 'bold',
              dayTextColor: '#222222',
              textDisabledColor: '#d9e1e8',
              monthTextColor: '#57B9BB',
              arrowColor: '#57B9BB',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '500',
              textDayFontSize: 16,
              textMonthFontSize: 18,
              selectedDayBackgroundColor: '#57B9BB',
              selectedDayTextColor: '#ffffff',
              textDayHeaderFontSize: 8,
            }}
          />
          {/* </View> */}
          <BtnAddComponent onPress={onPress} title={STRING.choose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  main: {
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    paddingTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconHeader: {
    flex: 1,
    paddingLeft: 20,
  },
  viewTxtHeader: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    // flex:1
  },
  txtHeader: {
    fontWeight: 'bold',
  },
});
export default FillterCalandar;
