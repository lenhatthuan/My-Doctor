import React from 'react';
import {  Image,View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native';
import { getAllByPatientId } from '../store/actions/doctor-registration';
import DoctorServiceComponent from '../components/DoctorServiceComponent'
import { SafeAreaView } from 'react-navigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";

const DoctorOrderScreen = props =>{

    const [option, setOption] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const [namePatient, setNamePatient] = React.useState("name");
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        getListService();
        getNameUser();
      },[list]);



    const getListService = () => {
        AsyncStorage.getItem("id").then(res => {
            getAllByPatientId(res).then(res => {
                setList(res);
            })
        })
    }

    const getNameUser = () => {
        let patient = null;
          AsyncStorage.getItem("patientData").then((res) => {
            patient = JSON.parse(res);
            setNamePatient(patient.fullName);
          });

    }

    const renderData = ({item}) => {
        return (
           <View style = {{marginTop: 10, width: '80%', marginLeft:'10%', marginRight:'10%', flex:1}}>
              <DoctorServiceComponent
            name = {item.name}
            doctorId = {item.doctorId}
            namePatient = {namePatient}
            status = {item.status}
            serviceId = {item.serviceId}
            updatedAt = {item.updatedAt}
            id = {item.id}
            />
           </View>
        )
    }

    const Page1 = ({label}) => (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {label}
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
    );

    const Page2 = ({label}) => {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {label}
          </Text>
         
        <FlatList
            data = {list}
            renderItem = {renderData}
            
            >
            </FlatList>
     
        </View>
    );}


    return (


        <SafeAreaView style = {styles.screen}>
         
           {/* <Text>
             Doctor order screen 
            </Text>
           <View style = {{width: "100%"}}>
           <FlatList
            data = {list}
            renderItem = {renderData}
            >
            </FlatList>
           </View>
         */}

{/* <Tab value={option} onChange={(e) => setOption(e)} style = {{height: 20}}>
        <Tab.Item title="Bác sĩ riêng" />
        <Tab.Item title="Dịch vụ của tôi" />
      </Tab>
      <TabView value={option} onChange={setOption}>
        <TabView.Item style={{ width: "100%" }}>
         <View  style={{ width: "100%" }}>
             <Text>Test</Text>
         </View>
        </TabView.Item>
        <TabView.Item style={{ width: "100%", flex: 1}}>
        <View  style={{ width: "100%" , flex: 1}}>
        <FlatList
            data = {list}
            renderItem = {renderData}
            >
            </FlatList>
        </View>
        </TabView.Item>
      </TabView> */}

  
    <View style={[styles.container, {paddingTop: 20}]}>
          <ScrollableTabView
              tabBarActiveTextColor="#53ac49"
              renderTabBar={() => <TabBar underlineColor="#53ac49" />}>
            <Page1 tabLabel={{label: "Bác sĩ riêng"}}/>
            <View tabLabel = {{label: "Dịch vụ"}} style={{width: '100%', justifyContent: 'center',  flex: 1, flexDirection:'column'}}>
         {list != null ?  <FlatList
            data = {list}
            renderItem = {renderData}
            >
            </FlatList>: null}
            {list == null ?  <Image style = {{height: '100%', width: '90%'}} source = {require('../../assets/imgs/70780-no-result-found.gif')}/>: null}
        </View>
          </ScrollableTabView>

        </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%'
    }, container: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontSize: 28,
      },
})

export default DoctorOrderScreen;