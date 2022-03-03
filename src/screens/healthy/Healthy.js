import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StatusBar, Animated} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import {styles} from '../../theme/basic';
import Loading from '../../components/common/Loading';
import HealthyItem from '../../components/healthy/HealthyItem';
import BmiDialog from '../../components/healthy/bmi/BmiDialog';
import EmotionDialog from '../../components/healthy/emotion/EmotionDialog';
import HeartBeatDialog from '../../components/healthy/heartbeat/HeartBeatDialog';

const Healthy=(props) =>{
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const show = text => {
    setOption(text);
    setVisible(true);
  };

  const navigate = text => {
    setIsLoading(true);
    props.navigation.push(text);
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, {backgroundColor: 'white'}]}>
      <Loading visible={isLoading} message={option} />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={[styles.text_header, {color: '#009387'}]}>
          Theo dõi sức khỏe!
        </Text>
      </View>
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: anim,
            backgroundColor: '#009387',
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
        <HealthyItem
          onPress={() => navigate('Emotion')}
          title="Tâm trạng"
          content="Bạn đang cảm thấy như thế nào?"
          button="Cập nhật"
          add={() => show('Emotion')}
          icon={<Icon name="mood" color="gold" />}
        />
        <HealthyItem
          onPress={() => navigate('HeartBeatChart')}
          title="Huyết áp và nhịp tim"
          content="Cập nhật chỉ số huyết áp và nhịp tim của bạn"
          button="Đo ngay"
          add={() => show('HeartBeat')}
          icon={<Icon type="font-awesome" name="heartbeat" color="red" />}
        />
        <HealthyItem
          onPress={() => navigate('Bmi')}
          title="BMI"
          content="Cập nhật chiều cao và cân nặng của bạn"
          button="Đo ngay"
          add={() => show('Bmi')}
          icon={<Icon type="font-awesome-5" name="weight" color="blue" />}
        />
      </Animated.View>
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        {option === 'Bmi' && <BmiDialog close={() => navigate('Bmi')} />}
        {option === 'HeartBeat' && (
          <HeartBeatDialog close={() => navigate('HeartBeat')} />
        )}
        {option === 'Emotion' && (
          <EmotionDialog close={() => navigate('Emotion')} />
        )}
      </Overlay>
    </View>
  );
}
export default Healthy;