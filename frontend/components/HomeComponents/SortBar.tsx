import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortBtn from '@/components/HomeComponents/SortBtn';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface SortBarProps {
  currentSortMode: string,
  setSortMode: (sortMode: string) => void
}

export default function SortBar({currentSortMode, setSortMode} : SortBarProps) {
  return (
    <View style={styles.sortBtnContainer}>
      {/* <FontAwesome name='filter' size={FontSizes.medium} color={Colors.white}/> */}

      <SortBtn
        filterMode={'hours'}
        label={'Hours'}
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
      />

      <SortBtn
        filterMode={'datePurchased'}
        label={'Date purchased'}
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
      />
  
      <SortBtn
        filterMode={'entered'}
        label={'Default'}
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sortBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.unit1o5,
    marginBottom: Spacing.unit1o5
  }
});
