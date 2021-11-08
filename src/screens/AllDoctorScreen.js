import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Pressable 
} from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { styles } from "../theme/style";
import { getAll } from "../store/actions/doctor";
import { SafeAreaView } from "react-navigation";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function AllDoctorScreen({ navigation })  {
  const [name, setName] = useState();
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [listSearchDoctor, setListSearchDoctor] = useState([]);
  const [doctor, setDoctor] = useState();

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

  const navigateToProfile = (item) => {
    setDoctor(item);
    
    navigation.navigate("DoctorProfile", {
        doctor: item

    });
  }

  const setDoctorProfile = (item) => {
    setDoctor(item);
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback 
        onPress={() => {
          setId(item.id);
          // setDoctorProfile(item);
          navigateToProfile(item);
        }}
        style={styles.list}
      >
        <Avatar size="large" rounded source={{ uri: item.avatar }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontWeight: "bold" }}>{item.fullname}</Text>
          <Text>Chuyên khoa {item.department}</Text>
        </View>
      </TouchableWithoutFeedback >
    );
  };

  return (
   <SafeAreaView style={{ flex: 1 }}>
        <View style={{marginTop: 30 }}>
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
        onClear={(text) => {
            setName('');
          // findDoctorByName(text).then((result) => setData(result));
          findDoctorByName();
        }}
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
        extraData={id}
      />
    </View>
   </SafeAreaView>

  );
}
