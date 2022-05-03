import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {Overlay, Icon} from 'react-native-elements';
import Sysptom from '../../components/diagnose/Sysptom';
import Diseases from '../../components/diagnose/Diseases';
import MultiSelect from 'react-native-multiple-select';
import BtnAddComponent from '../../components/common/BtnAddComponent';
const Diagnose = props => {
  let questions = require('../../config/SymptomsOutput.json').filter(
    question => question.IsPatientProvided === false,
  );

  const diseases = require('../../config/DiseasesOutput.json');
  const url = 'http://api.endlessmedical.com/v1/dx/';
  const [questionFilter, setQuestionFilter] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  const [visible, setVisible] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [diseasesDiagnose, setDiseasesDiagnose] = useState([]);
  const [show, setShow] = useState(false);
  const analyze = async () => {
    try {
      const response = await fetch(url + 'Analyze?SessionID=' + sessionId);
      const json = await response.json();
      console.log('json: ', json);
      json.Diagnose
        ? setDiseasesDiagnose(json.Diagnose)
        : setDiseasesDiagnose([]);
      setDiseasesDiagnose(json.Diseases);
      setShow(true);
    } catch (err) {
      console.log('Get sessionId error: ' + err);
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

  const connect = async () => {
    console.log('get secsion!');
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
      console.log('get secsion success!');
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
      for (const key in diseaseDiagnose) {
        const percent = parseFloat(diseaseDiagnose[key]).toFixed(2) * 100;
        if (percent > 0 && percent <= 100) {
          const disease = diseases.find(element => element.text === key);
          data.push({
            department: disease.department,
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
      <Modal visible={visible || show} transparent={true} animationType="fade">
        {show ? (
          <Pressable
            style={styles.modalSym}
            onPress={() => {
              setShow(false);
            }}>
            <View style={styles.modalBody}>
              {formatDisease().length > 0 ? (
                (
                  <Image
                    style={styles.img}
                    source={require('../../../assets/imgs/sick.gif')}
                  />
                ) &&
                formatDisease().map(disease => (
                  <Diseases name={disease.name} percent={disease.percent} />
                ))
              ) : (
                <View style={styles.modalBody}>
                  <Image
                    style={styles.img}
                    source={require('../../../assets/imgs/heathy_ok.gif')}
                  />
                  <Text style={styles.txtHeathy}>
                    Sức khỏe của bạn hiện tại rất tốt !!
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        ) : null}
        {visible ? (
          <Pressable
            onPress={() => {
              setVisible(false);
            }}
            style={styles.modalSym}>
            <View style={styles.modalBody}>
              <Sysptom
                initAnswer={() => {
                  const index = answers.findIndex(
                    answer => answer.question === question,
                  );
                  return index === -1
                    ? question.default
                    : answers[index].answer;
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
            </View>
          </Pressable>
        ) : null}
      </Modal>

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
      <BtnAddComponent title="Chuẩn đoán" onPress={analyze} />

      {/* <>
    <Modal visible={show} transparent={true} animationType="fade">
        <Pressable
          style={styles.modalSym}
          onPress={() => {
            setShow(false);
          }}>
          <View style={styles.modalBody}>
            {formatDisease().length > 0 ? (
              formatDisease().map(disease => (
                <Diseases name={disease.name} percent={disease.percent} />
              ))
            ) : (
              <Text>Khỏe mạnh</Text>
            )}
          </View>
        </Pressable>
        <BtnAddComponent title="OK" onPress={setShow(false)} />
      </Modal>
    </> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalSym: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    alignItems: 'center',
  },
  modalBody: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
    borderRadius: 3,
  },
  txtHeathy: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#05595B',
    padding: 5,
  },
});

export default Diagnose;
