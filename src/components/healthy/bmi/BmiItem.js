import React, { useState } from "react";
import { View, Text } from "react-native";
import { Icon, Overlay } from "react-native-elements";
// import { formatTime } from "../../../utils/string-format";
import BmiDialog from "./BmiDialog";
import { styles } from "../../../theme/healthy";

const BmiItem = ({ item, remove })=> {
  const [visible, setVisible] = useState(false);

  let bmi = (item.weight / ((item.tall / 100) * 2)).toFixed(2);

  const compare = () => {
    if (bmi < 18.5) return { status: "Gầy", backgroundColor: "paleturquoise" };
    else if (bmi <= 22.9)
      return { status: "Lý tưởng", backgroundColor: "lightgoldenrodyellow" };
    else return { status: "Béo", backgroundColor: "pink" };
  };

  return (
    <View style={[styles.item, { backgroundColor: compare().backgroundColor }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text>Chiều cao: {item.tall} cm</Text>
          <Text>Cân nặng: {item.weight} kg</Text>
          <Text>
            BMI: {bmi} - {compare().status}
          </Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Icon name="edit" color="green" onPress={() => setVisible(true)} />
          <Icon name="delete" color="red" onPress={remove} />
        </View>
      </View>
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <BmiDialog
          id={item.id}
          action="edit"
          initTall={item.tall.toString()}
          initWeight={item.weight.toString()}
          close={() => setVisible(false)}
        />
      </Overlay>
    </View>
  );
}

export default BmiItem;