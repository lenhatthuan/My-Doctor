import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from "react-native-vector-icons/Entypo";
import {
  balanceFormat,
  convertMoneyFromVNToUS,
} from "../../../utils/string-format";
import BtnAddComponent from "../../../components/common/BtnAddComponent";
import BtnCancelComponent from "../../../components/common/BtnCancelComponent";
import { updateRegistration } from "../../../store/actions/doctor-registration";
import WebView from "react-native-webview";
import { Icon } from "react-native-elements";
import SbNotification from "../../../components/common/snackbar/SbNotification";
import Clipboard from "@react-native-community/clipboard";
function PaymentScreen({ route, navigation }) {
  const { price, registration } = route.params;
  const [phone, setPhone] = React.useState("0");
  const [isPaypal, setIsPaypal] = React.useState(false);
  const [isPageLoading, setIsPageLoading] = React.useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);

  const [messageSb, setMessageSb] = useState("Thành công");

  const urlPaypal =
    "http://still-wave-21655.herokuapp.com/payment/paypal/" +
    convertMoneyFromVNToUS(price) +
    "/" +
    registration.name;
  React.useEffect(() => {
    AsyncStorage.getItem("accountData").then((res) => {
      let account = JSON.parse(res);
      setPhone(account.username);
    });
  }, []);

  const setPageVisible = (visible) => {
    setIsPageLoading(visible);
  };

  const btnPressRegister = () => {
    updateRegistration(registration.id, registration.name, "PENDDING").then(
      (res) => {
        navigation.navigate("Home");
      }
    );
  };

  const btnPressCancel = () => {
    updateRegistration(registration.id, registration.name, "CANCEL").then(
      (res) => {
        navigation.goBack();
      }
    );
  };

  const successSnackbar = () => {
    setIsSnackbar(true);
  };

  const onHandleSnackbar = () => {
    setIsSnackbar(false);
  };

  const handleResponsePaypal = (data) => {
    if (data.url.includes("success")) {
      setIsPaypal(false);
      setMessageSb("Thanh toán thành công!");
      updateRegistration(registration.id, registration.name, "CONFIRMED").then(
        (res) => {    
          successSnackbar();
        }
      );
    } else if (data.url.includes("cancel")) {
      setMessageSb("Lỗi thanh toán!");
      setIsPaypal(false);
      // this.setState({ showModal: false, status: "Cancelled" });
    } else if (data.title === "ERROR") {
      setMessageSb("Lỗi thanh toán hệ thống!");
      setIsPaypal(false);
      // this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };

  return (
    <>
      <SafeAreaView style={styles.screen}>
        {/* <LoadingPageComponent visible = {isPageLoading} setPageVisible = {setPageVisible}/> */}
        <ScrollView
          style={{ marginHorizontal: 20, flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
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
              <View style={{ flexDirection: "column", padding: 5 }}>
                <Text style={{ fontSize: 15, padding: 5 }}>Ngân hàng</Text>
                <Text style={{ fontSize: 15, padding: 5 }}>Tên tài khoản</Text>
                <Text style={{ fontSize: 15, padding: 5 }}>Số tài khoản</Text>
              </View>
              <View style={{ flexDirection: "column", padding: 5 }}>
                <Text style={{ fontSize: 15, padding: 5, fontWeight: "500" }}>
                  BIDV
                </Text>
                <Text style={{ fontSize: 15, padding: 5, fontWeight: "500" }}>
                  MY DOCTOR - COMPANY
                </Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 15, padding: 5, fontWeight: "500" }}>
                    31410029270000
                  </Text>
                  <TouchableOpacity
                    onPress={() => Clipboard.setString("31410029270000")}
                  >
                    <View>
                      <Text
                        style={{ fontSize: 15, padding: 5, color: "#FC5404" }}
                      >
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
                onPress={() => Clipboard.setString("DKDVBASI " + phone)}
              >
                <View>
                  <Text style={{ fontSize: 15, padding: 5, color: "#FC5404" }}>
                    {" "}
                    Sao chép
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 10 }}>
              Chọn chuyển khoản, nếu đã chuyển khoản thành công. MyDoctor sẽ
              liên hệ bạn, hoặc bạn liên lạc qua: 090000000
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <Modal visible={isPaypal}>
              <TouchableOpacity
                onPress={() => {
                  setIsPaypal(false);
                }}
                style={{ backgroundColor: "#1597E5", paddingTop: 20 }}
              >
                <Icon
                  name="arrow-back"
                  color="#1597E5"
                  raised
                  onPress={() => setIsPaypal(false)}
                />
              </TouchableOpacity>
              <WebView
                source={{ uri: urlPaypal }}
                onNavigationStateChange={(data) => {
                  console.log("title: " + data.url);
                  handleResponsePaypal(data);
                }}
                // injectedJavaScript={`document.f1.submit()`}
              ></WebView>
            </Modal>

            <BtnAddComponent
              onPress={() => btnPressRegister()}
              title="Đã chuyển khoản xong"
            />
          </View>

          <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                backgroundColor: "white",
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}
            >
              <Pressable
                onPress={() => {
                  setIsPaypal(true);
                }}
              >
                <Image
                  source={require("../../../../assets/imgs/vnpay.png")}
                  style={{ width: 70, height: 70 }}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsPaypal(true);
                }}
                style={{ marginLeft: 5 }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Thanh toán bằng VNPAY
                </Text>
              </Pressable>
            </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,

              elevation: 3,
            }}
          >
            <Text style={{ padding: 5, color: "#aaa", marginBottom: 5 }}>
              Hoặc
            </Text>
          </View>

          <BtnCancelComponent
            onPress={() => btnPressCancel()}
            title="Hủy đăng ký"
          />


          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              textAlign: "center",
              height: 40,
            }}
          ></View>
        </ScrollView>
        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                backgroundColor: "white",
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}
            >
              <Pressable
                onPress={() => {
                  setIsPaypal(true);
                }}
              >
                <Image
                  source={require("../../../../assets/imgs/paypalText.png")}
                  style={{ width: 70, height: 70 }}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsPaypal(true);
                }}
                style={{ marginLeft: 5 }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Thanh toán bằng paypal
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SbNotification
        visible={isSnackbar}
        message={messageSb}
        onPress={onHandleSnackbar}
        action="OK"
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});

export default PaymentScreen;
