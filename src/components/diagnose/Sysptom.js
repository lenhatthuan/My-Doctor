import React, {useState} from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import {Slider, CheckBox} from 'react-native-elements';

const Symptom = ({initAnswer, question, submit}) => {
  const [answer, setAnswer] = useState(initAnswer);
  return (
    <View style = {styles.view}>
      <Image style = {styles.img} source={{uri: "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png"}}/>
      <Text style = {styles.txtQuestion}>{question.text}</Text>
      <View style = {styles.body}>
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
          }

        }
          thumbTintColor="#FFD365"
          thumbTouchSize={{ width: 20, height: 20 }}
          trackStyle={{borderRadius: 20 }}
          thumbStyle={{justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        question.choices.map(choice => (
          <CheckBox
            title={choice.text}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={choice === answer}
            onPress={() => setAnswer(choice)}
          />
        ))
      )}
      </View>
      <Button title="Triệu chứng" onPress={() => submit(answer)} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 3
  },
  btn :{
    borderRadius: 10
  },
  txtQuestion: {
    padding: 5,
    fontSize: 20,
    fontWeight: "500",
    color: "#B33030",   
  },
  body: {
    padding: 10
  }
})

export default Symptom;
