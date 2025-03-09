import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Spacing } from '@/constants/Constants';
import AddGameButton from './AddGameButton';
import OpenCloseBar from './OpenCloseBar';
import SortBar from './SortBar';

interface FunctionButtonsProps {
  gameListRef: React.RefObject<FlatList>;
}

export default function FunctionButtons({ gameListRef }: FunctionButtonsProps) {
  return (
    <View style={styles.functionButtons}>
      <SortBar />
      <AddGameButton gameListRef={gameListRef}/>
      <OpenCloseBar />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const isSmallScreen = windowWidth < 450;

const styles = StyleSheet.create({
  functionButtons: {
    flexDirection: 'row',
    gap: Spacing.unit,
    width: '95%',
    marginBottom: isSmallScreen ? Spacing.unit1o5 * 2 : Spacing.unit1o5 * 5
  },
}); 