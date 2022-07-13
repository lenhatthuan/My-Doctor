import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Sysptom from '../../components/diagnose/Sysptom';
import Diseases from '../../components/diagnose/Diseases';
import MultiSelect from 'react-native-multiple-select';
import BtnAddComponent from '../../components/common/BtnAddComponent';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';
const COUNT = 5;
const DURATION = 2000;
const initialPhase = {scale: 0, opacity: 1};
const constructAnimations = () =>
  [...Array(COUNT).keys()].map(() => initialPhase);
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
  const [diseasesDiagnose, setDiseasesDiagnose] = useState([]);
  const [show, setShow] = useState(false);

  const updateSymptom = async (sessionId, name, value) => {
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

  const diagnose = async () => {
    try {
      // get session
      const response = await fetch(url + 'InitSession');
      const json = await response.json();
      const SessionID = json.SessionID;
      console.log(SessionID);
      // accept
      await fetch(
        url +
          'AcceptTermsOfUse?passphrase=I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com&SessionID=' +
          SessionID,
        {method: 'POST'},
      );
      // add answer
      answers.forEach(element =>
        updateSymptom(SessionID, element.question.name, element.answer),
      );
      // analyze
      const res = await fetch(url + 'Analyze?SessionID=' + SessionID);
      const body = await res.json();
      console.log('json: ', body);
      setDiseasesDiagnose(body.Diseases);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  let currentQuestions = () =>
    questions.filter(
      question =>
        answers.findIndex(answer => answer.question == question) == -1,
    );

  const format = useMemo(() => {
    let data = [];
    const categories = new Set(answers.map(answer => answer.question.category));
    categories.forEach(category =>
      data.push({
        category: category,
        data: answers.filter(answer => answer.question.category === category),
      }),
    );
    return data;
  }, [answers]);

  const formatDisease = () => {
    let data = [];
    diseasesDiagnose?.forEach(diseaseDiagnose => {
      for (const key in diseaseDiagnose) {
        const percent = parseFloat(diseaseDiagnose[key]).toFixed(2) * 100;
        if (percent > 0 && percent <= 100) {
          const disease = diseases.find(element => element.text === key);
          data.push({
            department: disease?.department ?? 'none',
            name: disease?.laytext ?? 'Không rõ',
            percent: percent + '%',
          });
        }
      }
    });
    return data;
  };

  const renderItemSectionList = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setQuestion(item.question);
            setVisible(true);
          }}
          style={styles.sessionContainer}>
          <Text style={styles.txtQuestion}>{item.question.text}</Text>
          <View style={styles.answerContainer}>
            <Text style={styles.txtAnswer}>
              {item.question.type !== 'categorical'
                ? item.answer
                : item.answer.text}
            </Text>
          </View>
          <View style={styles.actionSessionContainer}>
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
        </TouchableOpacity>
      );
    },
    [question, answers],
  );

  const onChangeTextSearch = useCallback(
    text => {
      setQuestionFilter(
        currentQuestions().filter(question =>
          question.text.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    },
    [question, answers],
  );

  const onchangeSelectedItem = useCallback(
    item => {
      setQuestion(questions.find(question => question.name == item));
      setVisible(true);
      setQuestionFilter(currentQuestions());
    },
    [question, visible, questionFilter, answers],
  );

  const renderEmptySection = useCallback(() => {
    return (
      <View
        style={{
          width: 400,
          height: 400,
          justifyContent: 'center',
          paddingLeft: 20,
        }}>
        {[...Array(3).keys()].map(index => {
          return (
            <MotiView
              from={{opacity: 0.6, scale: 1}}
              animate={{opacity: 0, scale: 4}}
              transition={{
                type: 'timing',
                duration: DURATION,
                easing: Easing.out(Easing.ease),
                loop: true,
                delay: index * 400,
                repeatReverse: false,
              }}
              key={index}
              style={{
                backgroundColor: '#90C8AC',
                height: 100,
                width: 100,
                borderRadius: 100,
                position: 'absolute',
                left: 20,
              }}
            />
          );
        })}

        <View style={styles.btnImage}>
          <Image
            style={styles.imageAnimated}
            source={require('../../../assets/imgs/doctor_dis.png')}
          />
        </View>

        <View style={styles.guideContainer}>
          <View style={styles.chatGuiTopContainer}>
            <Text style={styles.txtGuide}>Bạn hãy chọn một câu hỏi bất kỳ</Text>
          </View>
          <View style={styles.chatGuiBottomContainer}>
            <Text style={styles.txtGuide}>
              Sau đó trả lời câu hỏi và chọn chẩn đoán nhé!
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <MultiSelect
        itemTextColor="#000"
        styleTextDropdown={{
          marginVertical: 20,
        }}
        hideTags
        items={questionFilter}
        uniqueKey="name"
        onSelectedItemsChange={onchangeSelectedItem}
        selectText="Triệu chứng"
        searchInputPlaceholderText="Triệu chứng"
        onChangeInput={onChangeTextSearch}
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
              <Image
                style={styles.img}
                source={
                  formatDisease().length > 0
                    ? require('../../../assets/imgs/not-ok.png')
                    : require('../../../assets/imgs/doctor-ok.png')
                }
              />
              {formatDisease().length > 0 ? (
                formatDisease().map(disease => (
                  <Diseases name={disease.name} percent={disease.percent} />
                ))
              ) : (
                <Text style={styles.txtHeathy}>
                  Sức khỏe của bạn hiện tại rất tốt !!
                </Text>
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
        sections={format}
        ListEmptyComponent={renderEmptySection}
        renderItem={renderItemSectionList}
        renderSectionHeader={({section: {category}}) => (
          <Text style={{fontWeight: 'bold', color: 'green', fontSize: 15}}>
            {category}
          </Text>
        )}
      />
      <BtnAddComponent title="Chuẩn đoán" onPress={diagnose} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtQuestion: {fontWeight: '500', color: '#000', fontSize: 15},
  txtAnswer: {fontWeight: '600', color: '#2196f3', fontSize: 14},
  answerContainer: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginVertical: 5,
  },
  actionSessionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  sessionContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#79DAE8',
    marginVertical: 5,
    borderRadius: 5,
    borderStyle: 'dotted',
  },
  txtGuide: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3639',
  },
  chatGuiTopContainer: {
    width: 200,
    height: 70,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E8F9FD',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 70,
    shadowColor: '#F5F0BB',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 4,
  },
  chatGuiBottomContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    paddingLeft: 25,
    width: 230,
    height: 80,
    backgroundColor: '#DFF6FF',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 60,
    marginTop: 30,
    shadowColor: '#F5F0BB',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 4,
  },
  guideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 500,
    width: 500,
    alignItems: 'flex-end',
    paddingRight: 30,
    paddingTop: 50,
    justifyContent: 'center',
  },
  imageAnimated: {
    width: 100,
    height: 100,
    borderRadius: 100,
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
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 100,
  },
  txtHeathy: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#05595B',
    padding: 5,
  },
});

export default Diagnose;
