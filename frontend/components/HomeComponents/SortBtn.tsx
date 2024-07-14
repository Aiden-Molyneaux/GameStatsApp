import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text} from '@/components/Customs';
import {sortGamesAction } from '@/store/gameListReducer';

interface SortBtnProps {
  filterMode: string,
  label: string,
  currentSortMode: string,
  setSortMode: (data: string) => void
}

export default function SortBtn({filterMode, label, currentSortMode, setSortMode}: SortBtnProps) {
  const dispatch = useDispatch();

  // const [isHovered, setIsHovered] = useState(false);

  function handleSortPress(sortModeStr: string) {
    dispatch(sortGamesAction({sort: sortModeStr})); 
    setSortMode(sortModeStr);
  }

  return (
    <Pressable 
      style={(filterMode === currentSortMode) 
        ? {...styles.sortBtn, backgroundColor: Colors.gray} 
        : styles.sortBtn} 
      onPress={() => {handleSortPress(filterMode);}}
    >
      <Text style={styles.sortByText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sortBtn: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: Spacing.unit1o2 + 8,
    margin: Spacing.unit1o5,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 5,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 5
  },
  sortByText: {
    fontSize: FontSizes.small,
  },
});