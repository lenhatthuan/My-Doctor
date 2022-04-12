import React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-swiper-flatlist';
import COLORS from '../../assets/colors';

const styles = StyleSheet.create({
  paginationContainer: {
    top:  170,
  },
  pagination: {
    borderRadius: 7,
    width: 7,
    height: 7
  },
});

export const CustomPagination = (props) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor = {COLORS.Malibu}
      paginationActiveColor="white"
    />
  );
};