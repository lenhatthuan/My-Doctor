import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {Slider, CheckBox} from 'react-native-elements';

const Symptom = ({initAnswer, question, submit}) => {
  const [answer, setAnswer] = useState(initAnswer);
  return (
    <View>
      <Text>{question.text}</Text>
      {question.type !== 'categorical' ? (
        <Slider
          maximumValue={question.max}
          minimumValue={question.min}
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
      <Button title="Triệu chứng" onPress={() => submit(answer)} />
    </View>
  );
};

export default Symptom;
