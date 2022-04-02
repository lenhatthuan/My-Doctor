import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  SectionList,
  Button,
  Text,
  View,
} from 'react-native';
import {Overlay, Icon} from 'react-native-elements';
import Sysptom from '../../components/diagnose/Sysptom';
import Diseases from '../../components/diagnose/Diseases';
import MultiSelect from 'react-native-multiple-select';

const Diagnose = props => {
  let questions = require('../../config/SymptomsOutput.json').filter(
    question => question.IsPatientProvided === false,
  );

  const diseases = require('../../config/DiseasesOutput.json');

  const url = 'http://api.endlessmedical.com/v1/dx/';

  const analyze = async () => {
    try {
      const response = await fetch(url + 'Analyze?SessionID=' + sessionId);
      const json = await response.json();
      setDiseasesDiagnose(json.Diseases);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSymptom = async (name, value) => {
    return await fetch(
      url +
        'UpdateFeature?SessionID=' +
        sessionId +
        '&name=' +
        name +
        '&value=' +
        value,
      {method: 'POST'},
    )
      .then(response => response.json())
      .then(json => console.log(json.status))
      .catch(err => null);
  };

  const deleteSymptom = async name => {
    return await fetch(
      url + 'DeleteFeature?SessionID=' + sessionId + '&name=' + name,
      {method: 'POST'},
    )
      .then(response => response.json())
      .then(json => console.log(json.status))
      .catch(err => null);
  };

  const [questionFilter, setQuestionFilter] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  const [visible, setVisible] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [diseasesDiagnose, setDiseasesDiagnose] = useState([]);
  const [show, setShow] = useState(false);

  const connect = async () => {
    try {
      const response = await fetch(url + 'InitSession');
      const json = await response.json();
      await fetch(
        url +
          'AcceptTermsOfUse?passphrase=I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com&SessionID=' +
          json.SessionID,
        {method: 'POST'},
      );
      setSessionId(json.SessionID);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connect();
  }, []);

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

  const formatDisease = () => {
    let data = [];
    diseasesDiagnose.forEach(diseaseDiagnose => {
      console.log(diseaseDiagnose);
      for (const key in diseaseDiagnose) {
        const percent = parseFloat(diseaseDiagnose[key]).toFixed(2) * 100;
        if (percent > 0 && percent <= 100) {
          const disease = diseases.find(element => element.text === key);
          data.push({
            name: disease.laytext,
            percent: percent + '%',
          });
        }
      }
    });
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
          setQuestionFilter(currentQuestions());
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
        displayKey="text"
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
            updateSymptom(question.name, answer.value);
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
                  deleteSymptom(item.question.name);
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
      <Button title="Chẩn đoán" onPress={analyze} />
      <Overlay isVisible={show} onBackdropPress={() => setShow(false)}>
        {formatDisease().length > 0 ? (
          formatDisease().map(disease => (
            <Diseases name={disease.name} percent={disease.percent} />
          ))
        ) : (
          <Text>Khỏe mạnh</Text>
        )}
        <Button title="OK" />
      </Overlay>
    </SafeAreaView>
  );
};

export default Diagnose;
