import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
  Linking,
} from "react-native";
import { styles } from "../theme/style";
import { getRecordByPatient } from "../store/actions/record";
import { Icon } from "react-native-elements";
// import { getDoctor } from "../store/actions/doctor";
import Record from "../components/Record";

export default function RecordScreen(props) {
  const [data, setData] = useState();

  useEffect(() => {
    AsyncStorage.getItem("patientData").then((res) => {
      getRecordByPatient(JSON.parse(res).patientId)
        .then((result) => setData(result))
        .catch((err) => console.error(err));
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/imgs/record.png")}
        style={styles.containerList}
      >
        <Text style={styles.title}>Hồ sơ bệnh án</Text>
        <FlatList
          ListEmptyComponent={
            <Text
              style={{
                alignSelf: "center",
                color: "white",
              }}
            >
              Trống
            </Text>
          }
          data={data}
          renderItem={({ item }) => (
            <Record
              item={item}
              onPress={(id) =>
                props.navigation.navigate("RecordDetail", { recordId: id })
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
