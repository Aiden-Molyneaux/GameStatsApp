import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Spacing } from '@/constants/Constants';
import AddGameButton from './AddGameButton';
import OpenCloseButtons from './OpenCloseButtons';
import SortButtons from './SortButtons';

interface FunctionButtonsProps {
  gameListRef: React.RefObject<FlatList>;
}

export default function FunctionButtons({ gameListRef }: FunctionButtonsProps) {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const [sortMode, setSortMode] = useState('entered');

  return (
    <View style={styles.functionButtons}>
      <SortButtons 
        currentSortMode={sortMode} 
        setSortMode={setSortMode}
        isDisabled={!isAuthenticated}
      />
      <AddGameButton
        gameListRef={gameListRef}
        isDisabled={!isAuthenticated}
      />
      <OpenCloseButtons 
        isDisabled={!isAuthenticated}
      />
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