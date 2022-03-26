import React, {useState} from 'react';
import {SafeAreaView, SectionList, Button, Text, View} from 'react-native';
import {Overlay, Icon} from 'react-native-elements';
import Sysptom from '../../components/diagnose/Sysptom';
import MultiSelect from 'react-native-multiple-select';

const Diagnose = props => {
  let questions = require('../../config/SymptomsOutput.json').filter(
    question => question.IsPatientProvided === false,
  );

  const url = 'http://api.endlessmedical.com/v1/dx/';
  const analyze = async () => {
    const sessionId = (await fetch(url + 'InitSession')).json().SessionID;
    await fetch(
      url +
        'AcceptTermsOfUse?passphrase=I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com&SessionID=' +
        sessionId,
      {method: 'POST'},
    );
  };

  const [questionFilter, setQuestionFilter] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  const [visible, setVisible] = useState(false);

  let currentQuestions = () =>
    questions.filter(
      question =>
        answers.findIndex(answer => answer.question == question) == -1,
    );

  const format = () => {
    let data = [];
    const categories = new Set(answers.map(answer => answer.question.category));
    categories.forEach(category =>
      data.push({
        category: category,
        data: answers.filter(answer => answer.question.category === category),
      }),
    );
    return data;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MultiSelect
        hideTags
        items={questionFilter}
        uniqueKey="name"
        onSelectedItemsChange={item => {
          setQuestion(questions.find(question => question.name == item));
          setVisible(true);
        }}
        selectText="Triệu chứng"
        searchInputPlaceholderText="Triệu chứng"
        onChangeInput={text =>
          setQuestionFilter(
            currentQuestions().filter(question =>
              question.text.toLowerCase().includes(text.toLowerCase()),
            ),
          )
        }
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="text"
        searchInputStyle={{color: '#CCC'}}
      />
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <Sysptom
          initAnswer={() => {
            const index = answers.findIndex(
              answer => answer.question === question,
            );
            return index === -1 ? question.default : answers[index].answer;
          }}
          question={question}
          submit={answer => {
            let current = [...answers];
            const index = answers.findIndex(
              answer => answer.question === question,
            );
            index === -1
              ? current.push({question: question, answer: answer})
              : (current[index] = {question: question, answer: answer});
            setAnswers(current);
            setQuestion({});
            setVisible(false);
          }}
        />
      </Overlay>
      <SectionList
        style={{padding: 10}}
        sections={format()}
        renderItem={({item}) => (
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <Text style={{flex: 10}}>
              {item.question.text}
              <Text style={{fontWeight: 'bold'}}>
                {item.question.type !== 'categorical'
                  ? item.answer
                  : item.answer.text}
              </Text>
            </Text>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Icon
                name="edit"
                onPress={() => {
                  setQuestion(item.question);
                  setVisible(true);
                }}
              />
              <Icon
                name="delete"
                onPress={() => {
                  let current = [...answers];
                  current.splice(current.indexOf(item), 1);
                  setAnswers(current);
                }}
              />
            </View>
          </View>
        )}
        renderSectionHeader={({section: {category}}) => (
          <Text style={{fontWeight: 'bold'}}>{category}</Text>
        )}
      />
      <Button title="Chẩn đoán" />
    </SafeAreaView>
  );
};

export default Diagnose;
