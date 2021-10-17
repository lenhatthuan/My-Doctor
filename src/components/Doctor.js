import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { styles } from "../theme/style";
import { getAll, findDoctorByName } from "../store/actions/doctor";

export default function DoctorList({ onPress }) {
  const [name, setName] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    getAll()
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item.id);
        }}
        style={styles.list}
      >
        <Avatar size="large" rounded source={{ uri: item.avatar }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold" }}>{item.fullname}</Text>
          <Text>Chuyên khoa {item.department}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        placeholder="Tên bác sĩ"
        onChangeText={(text) => {
          setName(text);
          findDoctorByName(text).then((result) => setData(result));
        }}
        value={name}
      />
      <FlatList
        ListEmptyComponent={
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ alignContent: "center" }}
          />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
