import React, {useState, useCallback} from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import {Slider, CheckBox} from 'react-native-elements';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';
import BtnDiseases from './components/BtnDiseases';
const COUNT = 5;
const DURATION = 2000;
const Symptom = ({initAnswer, question, submit}) => {
  const [answer, setAnswer] = useState(initAnswer);
  const renderImageHeader = useCallback(() => {
    return (
      <View
        style={{
          alignItems: 'center',
          height: 140,
          paddingTop: 10,
        }}>
        <View>
          {[...Array(3).keys()].map(index => {
            return (
              <MotiView
                from={{opacity: 0.8, scale: 1}}
                animate={{opacity: 0, scale: 3}}
                transition={{
                  type: 'timing',
                  duration: DURATION,
                  easing: Easing.out(Easing.ease),
                  loop: true,
                  delay: index * 200,
                  repeatReverse: false,
                }}
                key={index}
                style={styles.dot}
              />
            );
          })}
          <View style={styles.btnImage}>
            <Image
              style={styles.imageAnimated}
              source={require('../../../assets/imgs/doctor_dis.png')}
            />
          </View>
        </View>
      </View>
    );
  }, []);
  return (
    <View style={styles.view}>
      {renderImageHeader()}
      <Text style={styles.txtQuestion}>{question.text}</Text>
      <View style={styles.body}>
        {question.type !== 'categorical' ? (
          <Slider
            maximumValue={question.max}
            minimumValue={question.min}
            minimumTrackTintColor="#42C2FF"
            maximumTrackTintColor="#EFFFFD"
            step={!question.step ? 1 : question.step}
            value={answer}
            onValueChange={value => setAnswer(value)}
            thumbProps={{
              children: (
                <Text>
                  {!question.step
                    ? answer
                    : answer.toFixed(-Math.log10(question.step))}
                </Text>
              ),
            }}
            thumbTintColor="#FFD365"
            thumbTouchSize={{width: 20, height: 20}}
            trackStyle={{borderRadius: 20}}
            thumbStyle={{justifyContent: 'center', alignItems: 'center'}}
          />
        ) : (
          question.choices.map((choice, index) => (
            <CheckBox
              key={index}
              title={choice.text}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={choice === answer}
              onPress={() => setAnswer(choice)}
            />
          ))
        )}
      </View>
      {/* <Button title="Thêm triệu chứng" onPress={() => submit(answer)} /> */}
      <BtnDiseases onPress={() => submit(answer)} />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#90C8AC',
    width: 90,
    height: 90,
    borderRadius: 90,
    position: 'absolute',
    top: 0,
  },
  imageAnimated: {
    width: 90,
    height: 90,
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  btnImage: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 17,
  },
  view: {
    width: '100%',
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 3,
  },
  btn: {
    borderRadius: 10,
  },
  txtQuestion: {
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: '500',
    // color: '#B33030',
    color: '#377D71',
    textAlign: 'center',
    paddingBottom: 10,
  },
  body: {
    padding: 10,
  },
});

export default Symptom;
