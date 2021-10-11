import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tab, TabView, BottomSheet } from "react-native-elements";
import DoctorList from "../components/Doctor";
import DepartmentList from "../components/Department";
import Booking from "../components/Booking";
import { styles } from "../theme/style";
import { Icon } from "react-native-elements";

export default function ScheduleScreen(props) {
  const [option, setOption] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <Text style={styles.title}>Đặt lịch khám</Text>
      <Tab value={option} onChange={(e) => setOption(e)} variant="primary">
        <Tab.Item title="Bác sĩ" />
        <Tab.Item title="Chuyên khoa" />
      </Tab>
      <TabView value={option} onChange={setOption}>
        <TabView.Item style={{ width: "100%" }}>
          <DoctorList booking={() => setIsVisible(true)} />
        </TabView.Item>
        <TabView.Item style={{ width: "100%" }}>
          <DepartmentList onPress={() => setIsVisible(true)} />
        </TabView.Item>
      </TabView>
      <BottomSheet isVisible={isVisible}>
        <Booking
          exit={() => setIsVisible(false)}
          booking={() => {
            setIsVisible(false);
            props.navigation.push("Position");
          }}
        />
      </BottomSheet>
    </SafeAreaProvider>
  );
}
