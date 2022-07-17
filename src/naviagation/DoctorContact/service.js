import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DoctorOrderScreen from '../../screens/service/DoctorOrderScreen';
import ComfirmedSeviceScreen from '../../screens/service/ComfirmedServiceScreen';
import CancelSeviceScreen from '../../screens/service/CancelServiceScreen';
import ExpiredSeviceScreen from '../../screens/service/ExpiredServiceScreen';
import PenddingSeviceScreen from '../../screens/service/PenddingServiceScreen';
import CreatedSeviceScreen from '../../screens/service/CreatedServiceScreen';
const Tab = createMaterialTopTabNavigator();

function ServiceTap() {
  return (
    <Tab.Navigator
      initialRouteName="DoctorOrder"
      screenOptions={{
        tabBarIndicatorContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          alignContent: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          color: 'black',
          textTransform: 'none',
          textAlign: 'center',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'red',
          alignContent: 'center',
        },
      }}>
      {/* <Tab.Screen name ="chat" component={}/> */}
      <Tab.Screen
        name="DoctorOrder"
        component={DoctorOrderScreen}
        options={{tabBarLabel: 'Bác sĩ riêng'}}
      />
      <Tab.Screen
        name="Comfirmed"
        component={ComfirmedSeviceScreen}
        options={{tabBarLabel: 'Dịch vụ'}}
      />
      <Tab.Screen
        name="Pendding"
        component={PenddingSeviceScreen}
        options={{tabBarLabel: 'Chờ xác nhận'}}
      />
      <Tab.Screen
        name="Created"
        component={CreatedSeviceScreen}
        options={{tabBarLabel: 'Chờ thanh toán'}}
      />
      <Tab.Screen
        name="Cancel"
        component={CancelSeviceScreen}
        options={{tabBarLabel: 'Đã hủy'}}
      />
      <Tab.Screen
        name="Expired"
        component={ExpiredSeviceScreen}
        options={{tabBarLabel: 'Hết hạn'}}
      />
    </Tab.Navigator>
  );
}

export default ServiceTap;
