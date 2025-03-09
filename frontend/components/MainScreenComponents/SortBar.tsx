import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SortButton from './SortButton';
import { Spacing } from '@/constants/Constants';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function SortBar() {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const [sortMode, setSortMode] = useState('entered');
  
  return (
    <View style={styles.sortBtnContainer}>
      <SortButton
        filterMode='hours'
        iconName='hourglass'
        currentSortMode={sortMode}
        setSortMode={setSortMode}
        isDisabled={!isAuthenticated}
      />

      <SortButton
        filterMode='datePurchased'
        iconName='calendar'
        currentSortMode={sortMode}
        setSortMode={setSortMode}
        isDisabled={!isAuthenticated}
      />
  
      <SortButton
        filterMode='entered'
        iconName='hashtag'
        currentSortMode={sortMode}
        setSortMode={setSortMode}
        isDisabled={!isAuthenticated}
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
