import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DoctorOrderScreen from '../../screens/service/DoctorOrderScreen';
import ComfirmedSeviceScreen from '../../screens/service/ComfirmedServiceScreen';
import CancelSeviceScreen from '../../screens/service/CancelServiceScreen';
import ExpiredSeviceScreen from '../../screens/service/ExpiredServiceScreen';
import PenddingSeviceScreen from '../../screens/service/PenddingServiceScreen';
import CreatedSeviceScreen from '../../screens/service/CreatedServiceScreen';
import DoctorOrder from './DoctorOrder';
import Created from './ServiceDetail/Created';
import Comfirmed from './ServiceDetail/Comfirmed';
import Cancel from './ServiceDetail/Cancel';
import Expired from './ServiceDetail/Expired';
import Pendding from './ServiceDetail/Pendding';
const Tab = createMaterialTopTabNavigator();

function serviceTap() {
  return (
    <Tab.Navigator
      initialRouteName="DoctorOrder"
      screenOptions={{
        tabBarActiveTintColor: '#85C88A',
        tabBarLabelStyle: {fontSize: 11, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: 'white'},
      }}>

        {/* <Tab.Screen name ="chat" component={}/> */}
      <Tab.Screen
        name="DoctorOrder"
        component={DoctorOrder}
        options={{tabBarLabel: 'Bác sĩ riêng'}}
      />
      <Tab.Screen
        name="Comfirmed"
        component={Comfirmed}
        options={{tabBarLabel: 'Dịch vụ'}}
      />
      <Tab.Screen
        name="Pendding"
        component={Pendding}
        options={{tabBarLabel: 'Chờ xác nhận'}}
      />
      <Tab.Screen
        name="Created"
        component={Created}
        options={{tabBarLabel: 'Chờ thanh toán'}}
      />
      <Tab.Screen
        name="Cancel"
        component={Cancel}
        options={{tabBarLabel: 'Đã hủy'}}
      />
      <Tab.Screen
        name="Expired"
        component={Expired}
        options={{tabBarLabel: 'Hết hạn'}}
      />
    </Tab.Navigator>
  );
}

export default serviceTap;
