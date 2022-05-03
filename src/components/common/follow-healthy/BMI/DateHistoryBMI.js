import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {deleteBMI, updateBMI} from '../../../../store/actions/bmi';
import EditBMI from './EditBMI';
const DateHistory = props => {
  const [isEdit, setIsEdit] = useState(false);

  const onCancel = () => {
    setIsEdit(false);
  };

  const update = (tall, weigh) => {
    updateBMI(props.id, tall, weigh).then(res => {
      if (res) {
        setIsEdit(false);
        props.reloadListBMI();
      }
    });
  };

  let BMI = {
    id: props.id,
    tall: props.tall,
    weigh: props.weigh,
    updatedAt: props.date,
  };

  const onDelete = () => {
    deleteBMI(props.id).then(res => {
      if (res) {
        setIsEdit(false);
        props.reloadListBMI();
      }
    });
  };
  return (
    <Pressable
      style={styles.main}
      onPress={() => {
        setIsEdit(true);
      }}>
      <View style={styles.component}>
        <Text style={styles.txtComponent}>{props.date}</Text>
      </View>
      <View style={styles.component}>
        <Text style={styles.txtComponent}>{props.title}</Text>
      </View>
      <View style={styles.component}>
        <Text style={styles.txtComponent}>{props.data}</Text>
      </View>
      <EditBMI
        visible={isEdit}
        onCancel={onCancel}
        onDelete={onDelete}
        BMI={BMI}
        update={update}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  component: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtComponent: {
    fontWeight: 'bold',
  },
});

export default React.memo(DateHistory);
