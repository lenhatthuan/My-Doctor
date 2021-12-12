import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ImageBackground } from "react-native";
import { DataTable } from "react-native-paper";
import { styles } from "../theme/style";
import { getByRecord } from "../store/actions/prescription";

export default function RecordScreen(props) {
  const [prescription, setPrescription] = useState([]);

  useEffect(() => {
    getByRecord(props.route.params.recordId)
      .then((result) => setPrescription(result.prescription))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/imgs/record.png")}
        style={styles.containerList}
      >
        <Text style={styles.title}>Đơn thuốc</Text>
        <DataTable style={{ backgroundColor: "white" }}>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 1 }}>STT</DataTable.Title>
            <DataTable.Title style={{ flex: 3 }}>Tên thuốc</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Liều lượng</DataTable.Title>
            <DataTable.Title style={{ flex: 4, justifyContent: "center" }}>
              Cách dùng
            </DataTable.Title>
          </DataTable.Header>
          {prescription.map((medicine, index) => (
            <DataTable.Row>
              <DataTable.Cell style={{ flex: 1 }}>{++index}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 3 }}>
                {medicine.name}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2, justifyContent: "center" }}>
                {medicine.amount}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 4 }}>
                {medicine.use}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ImageBackground>
    </SafeAreaView>
  );
}
