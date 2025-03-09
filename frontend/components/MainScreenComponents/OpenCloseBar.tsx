import React from 'react';
import { View, StyleSheet } from 'react-native';
import OpenCloseButton from './OpenCloseButton';
import { Spacing } from '@/constants/Constants';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function OpenCloseBar() {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  return (
    <View style={styles.sortBtnContainer}>
      <OpenCloseButton mode='OPEN' iconName='search-plus' isDisabled={!isAuthenticated} />
      
      <OpenCloseButton mode='CLOSED' iconName='search-minus' isDisabled={!isAuthenticated}/>
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
