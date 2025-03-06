import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortButton from './SortButton';
import { Spacing } from '@/constants/Constants';

interface SortButtonsProps {
  currentSortMode: string,
  setSortMode: (sortMode: string) => void,
  isDisabled: boolean
}

export default function SortButtons({currentSortMode, setSortMode, isDisabled} : SortButtonsProps) {
  return (
    <View style={styles.sortBtnContainer}>
      <SortButton
        filterMode='hours'
        iconName='hourglass'
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
        isDisabled={isDisabled}
      />

      <SortButton
        filterMode='datePurchased'
        iconName='calendar'
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
        isDisabled={isDisabled}
      />
  
      <SortButton
        filterMode='entered'
        iconName='hashtag'
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
        isDisabled={isDisabled}
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
