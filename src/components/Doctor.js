import React, { useEffect } from "react";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { styles } from "../theme/style";
import { getAll, findDoctorByName } from "../store/actions/doctor";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullname: "Lê nhật Thu An",
    avatar:
      "https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg",
    department: "Mắt",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullname: "Lê Thị Ngọc Yến",
    avatar: "https://icdn.dantri.com.vn/thumb_w/640/2017/1-1510967806416.jpg",
    department: "Tim mạch",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullname: "dfakfka",
    avatar:
      "https://www.winwinstore.vn/wp-content/uploads/2020/12/8fc0bff637.jpeg",
    department: "Thận",
  },
];

function Doctor({ doctor, booking }) {
  return (
    <TouchableOpacity onPress={booking} style={styles.list}>
      <Avatar size="large" rounded source={{ uri: doctor.avatar }} />
      <View style={{ marginLeft: 20 }}>
        <Text>Bác sĩ {doctor.fullname}</Text>
        <Text>Chuyên khoa {doctor.department}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function DoctorList({ booking }) {
  const [name, setName] = React.useState();
  const [data, setData] = React.useState();

  useEffect(() => {
    getAll()
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View>
      <SearchBar
        placeholder="Tên bác sĩ"
        onChangeText={(text) => {
          setName(text);
          findDoctorByName(text).then((result) => setData(result));
        }}
        value={name}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <Doctor doctor={item} booking={booking} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
