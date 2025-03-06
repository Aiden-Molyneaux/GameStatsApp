import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Spacing } from '@/constants/Constants';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import OpenCloseBar from '@/components/HomeComponents/OpenCloseBar';
import SortButtons from '@/components/HomeComponents/SortButtons';

interface FunctionButtonsProps {
  gameListRef: React.RefObject<FlatList>;
}

export default function FunctionButtons({ gameListRef }: FunctionButtonsProps) {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const [sortMode, setSortMode] = useState('entered');
  const [isAddBtnPressed, setIsAddBtnPressed] = useState(false);

  function handleAddGame() {
    setTimeout(() => {
      gameListRef.current?.scrollToEnd({ animated: true }); // Scroll to the end when a new game is added
    }, 500);
  };

  return (
    <View style={styles.functionButtons}>
      <SortButtons 
        currentSortMode={sortMode} 
        setSortMode={setSortMode}
        isDisabled={!isAuthenticated}
      />
      <AddGameBtn
        onAddGame={handleAddGame}
        isPressed={isAddBtnPressed}
        setIsPressed={setIsAddBtnPressed}
        isDisabled={!isAuthenticated}
      />
      <OpenCloseBar 
        currentSortMode={''} 
        setSortMode={() => {}}
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