import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, Pressable } from "react-native";
import {
  balanceFormat,
  formatDate,
  addDays,
  discription,
  getTime,
} from "../../utils/string-format";
import { RadioButton } from "react-native-paper";
import { getServiceById } from "../../store/actions/service";
import CountDown from "react-native-countdown-component";
import {
  deleteRegistration,
  getAllByPatientIdAndDoctorId,
  updateRegistration,
} from "../../store/actions/doctor-registration";
import LoadingTranComponent from "../../components/common/LoadingTranComponent";
import HeaderBackComponent from "../../components/common/HeaderBackComponent";
import ErrorAlert from "../../components/common/ErrorAlertComponent";
const ServiceDetail = (props) => {
  const { registration } = props.route.params;
  const [price, setPrice] = useState(100000);
  const [duration, setDuration] = useState(registration.duration);
  const [isLoading, setIsLoading] = useState(false);
  const [isExist, setIsExist] = React.useState(false);

  useEffect(() => {
    setDuration(registration.duration);
  });

  useEffect(() => {
    getService();
  }, []);

  const cancelExistAlert = () => {
    setIsExist(false);
  };

  const updateExpired = () => {
    updateRegistration(registration.id, registration.name, "EXPIRED").then(
      (res) => {}
    );
  };

  const updateDelete = () => {
    deleteRegistration(registration.id).then((res) => {
      if (res) {
        console.log("delete");
        setIsLoading(false);
        props.navigation.goBack();
      } else console.log("fail");
    });
  };

  const getTimeSeconds = () => {
    return getTime(registration.updatedAt, duration);
  };

  const btnDeleteonPress = () => {
    setIsLoading(true);
    updateDelete();
  };

  const gotoPayment = () => {
    AsyncStorage.getItem("id").then((res) => {
      getAllByPatientIdAndDoctorId(res, registration.doctorId).then((res) => {
        if (res) {
          setIsExist(true);
        } else {
          props.navigation.navigate("payment", {
            price: price,
            registration: registration,
          });
        }
      });
    });
  };

  const getService = () => {
    getServiceById(registration.serviceId).then((res) => {
      setPrice(res.price);
    });
  };
  const getDateEnd = () => {
    return addDays(registration.updatedAt, registration.duration);
  };

  const onBack = () => {
    props.navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      <ErrorAlert
        visible={isExist}
        message="Bác sĩ này, bạn đã đăng kí, vui lòng kiểm tra lại!"
        onCancel={cancelExistAlert}
      />
      <HeaderBackComponent title={""} onBack={onBack} />
      <Text style={styles.text}>Chi tiết dịch vụ</Text>
      <Pressable style={{ flexDirection: "column", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#FF7800",
            height: 2,
            width: 45,
            borderRadius: 10,
            marginTop: 10,
          }}
        ></View>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 20 }}>
          {registration.name}
        </Text>
        {/* <Text style={{ color: "#009DAE" , marginTop: 5}}>{props.description}</Text> */}
        <View
          style={{
            borderBottomColor: "#C2FFF9",
            borderBottomWidth: 1,
            width: "80%",
            marginTop: 5,
          }}
        />
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          flexDirection: "column",
          justifyContent: "flex-start",
          // alignItems: "left",
          flex: 1,
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 10,
        }}
      >
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#FF5403" }}>
            Bác sĩ:{" "}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#FF5403" }}>
            {registration.nameDoctor}
          </Text>
        </Pressable>
        <Pressable style={{ marginTop: 5, flexDirection: "row" }}>
          <Text style={{ padding: 5, fontWeight: "bold", paddingLeft: 0 }}>
            Thời hạn đăng kí:
          </Text>
          <Text style={{ padding: 5, fontWeight: "bold" }}>
            {registration.duration}
          </Text>
          <Text style={{ padding: 5, paddingLeft: 1, fontWeight: "bold" }}>
            ngày
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <RadioButton value="first" status={"checked"} />
          <Text
            style={{
              fontWeight: "800",
              fontSize: 20,
              color: "#F90716",
              marginTop: 5,
            }}
          >
            {balanceFormat(price)}
          </Text>
        </Pressable>
        <Pressable
          style={{
            marginTop: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.text}>Ngày đăng ký:</Text>
          <Text style={{ color: "#32C1CD", fontWeight: "bold", marginLeft: 5 }}>
            {formatDate(registration.updatedAt)}
          </Text>
          <Text style={{ color: "#32C1CD", fontWeight: "bold", marginLeft: 5 }}>
            -
          </Text>
          <Text style={{ color: "#32C1CD", fontWeight: "bold", marginLeft: 5 }}>
            {formatDate(getDateEnd())}
          </Text>
        </Pressable>
        <Pressable
          style={{
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.text}> Trạng thái dịch vụ:</Text>
          <Text
            style={{
              color: "#1A5F7A",
              fontWeight: "bold",
              marginLeft: 5,
              marginTop: 10,
              marginBottom: 10,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {discription(registration.status)}
          </Text>
        </Pressable>
      </Pressable>
      <LoadingTranComponent visible={isLoading} message="Delete..." />
      <View style={styles.viewBtn}>
        {registration.status === "CREATED" ||
        registration.status === "CANCEL" ||
        registration.status === "EXPIRED" ? (
          <View style={styles.btnDelete}>
            <Text style={styles.txtBtn} onPress={() => btnDeleteonPress()}>
              Xóa
            </Text>
          </View>
        ) : null}

        {registration.status === "CREATED" ? (
          <View style={styles.btn}>
            <Text style={styles.txtBtn} onPress={() => gotoPayment()}>
              Tiếp tục thanh toán
            </Text>
          </View>
        ) : null}

        {registration.status === "EXPIRED" ||
        registration.status === "CANCEL" ? (
          <View style={styles.btn}>
            <Text style={styles.txtBtn} onPress={() => gotoPayment()}>
              Tiếp tục đăng ký
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBtn: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  screen: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontWeight: "bold",
  },
  txtBtn: {
    fontWeight: "bold",
    color: "white",
  },
  btn: {
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#1A5F7A",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  btnDelete: {
    padding: 10,
    borderRadius: 3,
    backgroundColor: "red",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

export default ServiceDetail;
