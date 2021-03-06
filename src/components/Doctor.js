import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { styles } from "../theme/style";
import { getAll } from "../store/actions/doctor";

export default function DoctorList(props) {
  const [name, setName] = useState();
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [listSearchDoctor, setListSearchDoctor] = useState([]);

  useEffect(() => {
    getAll()
      .then((result) => {
        setData(result);
        setListSearchDoctor(result);
      })
      .catch((err) => console.error(err));
  }, []);

  const findDoctorByName = async() =>{
    if(data) {
      let listDoctor = [];
      listDoctor = await data.filter(doctor => doctor.fullname.includes(name));
      if(Object.keys(listDoctor).length > 0) {
        setListSearchDoctor(listDoctor);
      }
    } else setData(data);
  }

  const navigateToProfile = () => {
    console.log("navigation!!");
    props.navigation.navigate("DoctorProfile");
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          onPress(item.id);
          // setId(item.id);
          // navigateToProfile();
          // booking();
        }}
        style={styles.list}
      >
        <Avatar size="large" rounded source={{ uri: item.avatar }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold" }}>{item.fullname}</Text>
          <Text>Chuyên khoa {item.department}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
       round 
       inputContainerStyle={{backgroundColor: 'white'}}
       leftIconContainerStyle={{backgroundColor: 'white'}}
       inputStyle={{backgroundColor: 'white'}}
       containerStyle={{
       backgroundColor: '#1e3d52',
       justifyContent: 'space-around',
       borderTopWidth:0,
       borderBottomWidth:0,}}
        searchIcon={{size:24}}
      style = {styles.searchBar}
        placeholder="Tên bác sĩ"
        onChangeText={(text) => {
          setName(text);
          // findDoctorByName(text).then((result) => setData(result));
          findDoctorByName();
        }}
        value={name}
      />
      <FlatList
      showsVerticalScrollIndicator = {true}
        ListEmptyComponent={
          <ActivityIndicator
            size="large"
            color="blue"
            style={{ alignContent: "center" }}
          />
        }
        data={listSearchDoctor}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
