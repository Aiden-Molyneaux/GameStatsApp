import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortBtn from '@/components/HomeComponents/SortBtn';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface SortBarProps {
  currentSortMode: string,
  setSortMode: (sortMode: string) => void,
  isDisabled: boolean
}

export default function SortButtons({currentSortMode, setSortMode, isDisabled} : SortBarProps) {
  return (
    <View style={styles.sortBtnContainer}>
      <SortBtn
        filterMode='hours'
        iconName='hourglass'
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
        isDisabled={isDisabled}
      />

      <SortBtn
        filterMode='datePurchased'
        iconName='calendar'
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
        isDisabled={isDisabled}
      />
  
      <SortBtn
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
