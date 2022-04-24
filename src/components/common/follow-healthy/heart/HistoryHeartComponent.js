import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import COLORS from '../../../../assets/colors';
import STRING from '../../../../utils/string';
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderBackComponent from '../../HeaderBackComponent';
const HistoryHeartComponent = (props) =>{

    const [isAddModel, setIsAddModel] = React.useState(false);
    const cancelGoalApplicationHandler = () => {
        setIsAddModel(false);
    };
    const onBack = () => {
        props.navigation.navigate("FollowHeathy");
    };

    const data1 = [
        { x: -2, y: 1 },
        { x: -1, y: 0 },
        { x: 8, y: 13 },
        { x: 9, y: 11.5 },
        { x: 10, y: 12 }
      ]
       
      const data2 = [
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 8, y: 12 },
        { x: 9, y: 13.5 },
        { x: 10, y: 18 }
      ]
      

    return (
        <View style = {styles.screen}>
           {/* <View style = {styles.header}>
           <HeaderBackComponent title="Theo dõi số đo nhịp tim" onBack={onBack} />
           </View>
           <View style = {styles.bodyContainer}>
           <View style = {styles.chartContainer}>
           <Chart
            style={{ height: 200, width: '100%', backgroundColor: '#eee' }}
            xDomain={{ min: -2, max: 10 }}
            yDomain={{ min: -2, max: 20 }}
            padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
            >
            <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
            <HorizontalAxis tickCount={3} />
            <Line data={data1} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />
            <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
            </Chart>
           </View>
           <View style = {styles.getAllContainer}>
           <Pressable style={styles.getAll} onPress={() => {
            props.navigation.navigate("ListHeart");
          }}>
            <Text style={styles.txtGetAll}>{STRING.getAllData}</Text>
            <AntDesign name="arrowright" size={24} color={COLORS.blueMint} />
          </Pressable>
           </View>
           <View style = {styles.notificationContainer}></View>
           </View> */}
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