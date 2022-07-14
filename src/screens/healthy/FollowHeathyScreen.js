import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BMIComponent from '../../components/common/follow-healthy/BMIComponent';
import HeartComponent from '../../components/common/follow-healthy/HeartComponent';
import MainComponent from '../../components/common/follow-healthy/MainComponent';
import {getAllBMI} from '../../store/actions/bmi';
import {useFocusEffect} from '@react-navigation/native';

const FollowHeathyScreen = props => {
  const [tall, setTall] = useState('');
  const [weigh, setWeigh] = useState('');

  const redirectedToBMI = () => {
    props.navigation.navigate('BMIHistory');
  };

  const redirectedToHeart = () => {
    props.navigation.navigate('HeartHistory');
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllListBMI();
    }),
  );

  const getAllListBMI = async () => {
    let id = await AsyncStorage.getItem('id');
    let arrBMI = '';
    getAllBMI(id).then(bmi => {
      if (bmi) {
        arrBMI = bmi;
        setTall(arrBMI[arrBMI.length - 1].tall);
        setWeigh(arrBMI[arrBMI.length - 1].weigh);
      } else {
        setTall(0);
        setWeigh(0);
      }
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.main}>
        <View style={styles.mainCmp}>
          <View style={styles.mainComponent}>
            <MainComponent tall={tall} weigh={weigh} />
          </View>
        </View>
        <View style={styles.component}>
          <HeartComponent goToHistory={redirectedToHeart} />
        </View>
        <View style={styles.component}>
          <BMIComponent goToHistory={redirectedToBMI} />
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCmp: {
    flex: 1,
  },
  mainComponent: {
    height: '80%',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  component: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: 36,
  },
  main: {
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '95%',
  },
});

export default FollowHeathyScreen;
