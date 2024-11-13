import React from 'react';
import { View, StyleSheet } from 'react-native';
import SortBtn from '@/components/HomeComponents/SortBtn';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface SortBarProps {
  currentSortMode: string,
  setSortMode: (sortMode: string) => void
}

export default function OpenCloseBar({currentSortMode, setSortMode} : SortBarProps) {
  return (
    <View style={styles.sortBtnContainer}>
      <SortBtn
        filterMode={'hours'}
        iconName={'open'}
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
      />

      <SortBtn
        filterMode={'datePurchased'}
        iconName={'close'}
        currentSortMode={currentSortMode}
        setSortMode={setSortMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sortBtnContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: Spacing.unit1o5
  }
});
