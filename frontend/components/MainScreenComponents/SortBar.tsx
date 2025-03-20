import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortButton from './SortButton';
import { Spacing } from '@/constants/Constants';

export default function SortBar() {
  return (
    <View style={styles.sortBtnContainer}>
      <SortButton
        sortType='hours'
        iconName='hourglass'
      />

      <SortButton
        sortType='datePurchased'
        iconName='calendar'
      />
  
      <SortButton
        sortType='entered'
        iconName='hashtag'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sortBtnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: Spacing.unit1o5
  }
});
