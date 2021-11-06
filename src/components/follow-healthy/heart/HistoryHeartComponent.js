import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import COLORS from '../../../../assets/colors';
import STRING from '../../../utils/string';
import { AntDesign } from "@expo/vector-icons";
import HeaderBackComponent from '../../common/HeaderBackComponent';
const HistoryHeartComponent = (props) =>{

    const [isAddModel, setIsAddModel] = React.useState(false);
    const cancelGoalApplicationHandler = () => {
        setIsAddModel(false);
    };
    const onBack = () => {
        props.navigation.navigate("FollowHeathy");
    };

    return (
        <View style = {styles.screen}>
           <View style = {styles.header}>
           <HeaderBackComponent title="Theo dõi số đo nhịp tim" onBack={onBack} />
           </View>
           <View style = {styles.bodyContainer}>
           <View style = {styles.chartContainer}></View>
           <View style = {styles.getAllContainer}>
           <Pressable style={styles.getAll} onPress={() => {
            props.navigation.navigate("ListHeart");
          }}>
            <Text style={styles.txtGetAll}>{STRING.getAllData}</Text>
            <AntDesign name="arrowright" size={24} color={COLORS.blueMint} />
          </Pressable>
           </View>
           <View style = {styles.notificationContainer}></View>
           </View>
        </View>

    )
}

const styles = StyleSheet.create({
    notificationContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        width: "100%"
    }, 

    getAllContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        width: "100%"
    },

    chartContainer: {
        flex: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        width: "100%"
    }, 

    header: {
        width: "100%"
    }, 

    bodyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:COLORS.backround,
        width: "100%"
    }, 

    screen: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:COLORS.backround
    }
})

export default HistoryHeartComponent;