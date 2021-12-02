import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { balanceFormat } from "../utils/string-format";
import BtnAddComponent from "../components/common/BtnAddComponent";
import BtnCancelComponent from "../components/common/BtnCancelComponent";
import { updateRegistration } from "../store/actions/doctor-registration";
// import Clipboard from "@react-native-community/clipboard";
function PaymentScreen({ route, navigation }) {
  const { price, registration } = route.params;
  const [phone, setPhone] = React.useState("0");
  React.useEffect(() => {
    AsyncStorage.getItem("accountData").then((res) => {
      let account = JSON.parse(res);
      setPhone(account.username);
    });
  }, []);

  const btnPressRegister = () => {
      updateRegistration(registration.id, registration.name, "PENDDING").then(res => {
        navigation.navigate("DoctorOrder")
      })
  }

  const btnPressCancel = () => {
    updateRegistration(registration.id, registration.name, "CANCEL").then(res => {
      navigation.goBack();
    })
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Entypo name="dots-three-horizontal" size={24} color="#FF7800" />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontWeight: "500" }}>
          Bạn có thể sử dụng Mobile banking để chuyển khoản
        </Text>
      </View>

      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Text style={{ color: "#01937C", fontWeight: "500", fontSize: 15 }}>
          Số tiền cần chuyển
        </Text>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 20,
            color: "#F90716",
            marginTop: 10,
          }}
        >
          {balanceFormat(price)}
        </Text>
      </View>

      <View style={{ marginTop: 10, padding: 10 }}>
        <Text style={{ color: "#01937C", fontWeight: "500", fontSize: 15 }}>
          Tài khoản ngân hàng của My Doctor
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "colunm", padding: 5 }}>
            <Text style={{ fontSize: 15, padding: 5 }}>Ngân hàng</Text>
            <Text style={{ fontSize: 15, padding: 5 }}>Tên tài khoản</Text>
            <Text style={{ fontSize: 15, padding: 5 }}>Số tài khoản</Text>
          </View>
          <View style={{ flexDirection: "colunm", padding: 5 }}>
            <Text style={{ fontSize: 15, padding: 5, fontWeight: "500" }}>
              BIDV
            </Text>
            <Text style={{ fontSize: 15, padding: 5, fontWeight: "500" }}>
              MY DOCTOR - COMPANY
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontSize: 15, padding: 5, fontWeight: "500" }}>
                31410029270000
              </Text>
              <TouchableOpacity
                onPress={() => Clipboard.setString("31410029270000")}
              >
                <View>
                  <Text style={{ fontSize: 15, padding: 5, color: "#FC5404" }}>
                    {" "}
                    Sao chép
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10, padding: 10 }}>
        <Text style={{ color: "#01937C", fontWeight: "500", fontSize: 15 }}>
          Nội dung chuyển khoản
        </Text>
        <View
          style={{
            marginTop: 10,
            borderColor: "#F58634",
            borderWidth: 2,
            borderRadius: 5,
            padding: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text>DKDVBASI {phone}</Text>

          <TouchableOpacity
            onPress={() => Clipboard.setString("DKDVBASI " + phone )}
          >
            <View>
              <Text style={{ fontSize: 15, padding: 5, color: "#FC5404" }}>
                {" "}
                Sao chép
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      <Text style = {{marginTop: 10}}>Nếu đã chuyển khoản xong, bạn vui lòng nhấn vào đã chuyển khoản, bên admin sẽ hỗ trợ kiểm tra. Nếu có điều gì thắc mắc liên hệ qua số điện thoại 0941571097</Text>

      </View>
      <View style = {{justifyContent: 'flex-end', flex: 1}}> 
      <BtnAddComponent
            onPress = {() => btnPressRegister()}
            title = "Đã chuyển khoản xong"

          />
      <BtnCancelComponent
          onPress = {() => btnPressCancel()}
           title = "Hủy đăng ký"
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});

export default PaymentScreen;
