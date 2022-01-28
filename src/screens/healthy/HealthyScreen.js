import React, { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { Icon, Overlay } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { styles } from "../../theme/basic";
import LoadingComponent from "../../components/common/LoadingComponent";
import HealthyComponent from "../../components/healthy/HealthyComponent";
import BMIDialogComponent from "../../components/healthy/bmi/BMIDialogComponent";
import EmotionDialogComponent from "../../components/healthy/emotion/EmotionDialogComponent";
import HeartBeatDialogComponent from "../../components/healthy/heartbeat/HeartBeatDialogComponent";

export default function HealthyScreen(props) {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const show = (text) => {
    setOption(text);
    setVisible(true);
  };

  const navigate = (text) => {
    setIsLoading(true);
    props.navigation.push(text);
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <LoadingComponent visible={isLoading} message={option} />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={[styles.text_header, { color: "#009387" }]}>
          Theo dõi sức khỏe!
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: "#009387" }]}
      >
        <HealthyComponent
          onPress={() => navigate("Emotion")}
          title="Tâm trạng"
          content="Bạn đang cảm thấy như thế nào?"
          button="Cập nhật"
          add={() => show("Emotion")}
          icon={<Icon name="mood" color="gold" />}
        />
        <HealthyComponent
          onPress={() => navigate("HeartBeatChart")}
          title="Huyết áp và nhịp tim"
          content="Cập nhật chỉ số huyết áp và nhịp tim của bạn"
          button="Đo ngay"
          add={() => show("HeartBeat")}
          icon={<Icon type="font-awesome" name="heartbeat" color="red" />}
        />
        <HealthyComponent
          onPress={() => navigate("BMI")}
          title="BMI"
          content="Cập nhật chiều cao và cân nặng của bạn"
          button="Đo ngay"
          add={() => show("BMI")}
          icon={<Icon type="font-awesome-5" name="weight" color="blue" />}
        />
      </Animatable.View>
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        {option === "BMI" && (
          <BMIDialogComponent close={() => navigate("BMI")} />
        )}
        {option === "HeartBeat" && (
          <HeartBeatDialogComponent close={() => navigate("HeartBeat")} />
        )}
        {option === "Emotion" && (
          <EmotionDialogComponent close={() => navigate("Emotion")} />
        )}
      </Overlay>
    </View>
  );
}
