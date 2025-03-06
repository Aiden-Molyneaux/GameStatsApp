import React from 'react';
import { View, StyleSheet } from 'react-native';
import OpenCloseButton from './OpenCloseButton';
import { Spacing } from '@/constants/Constants';

interface OpenCloseButtonsProps {
  isDisabled: boolean
}

export default function OpenCloseButtons({isDisabled} : OpenCloseButtonsProps) {
  return (
    <View style={styles.sortBtnContainer}>
      <OpenCloseButton mode='OPEN' iconName='search-plus' isDisabled={isDisabled}/>
      
      <OpenCloseButton mode='CLOSED' iconName='search-minus' isDisabled={isDisabled}/>
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
