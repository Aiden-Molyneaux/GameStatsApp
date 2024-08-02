import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { sortGamesAction } from '@/store/gameReducer';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text} from '@/components/Customs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface SortBtnProps {
  filterMode: string,
  label: string,
  currentSortMode: string,
  setSortMode: (data: string) => void
}

export default function SortBtn({filterMode, label, currentSortMode, setSortMode}: SortBtnProps) {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  function handleSortPress(sortModeStr: string) {
    dispatch(sortGamesAction({sort: sortModeStr})); 
    setSortMode(sortModeStr);
  }

  return (
    <Pressable
      style={[(filterMode === currentSortMode) ? {...styles.sortBtn, ...styles.sortHovered} : styles.sortBtn,
        {...(isHovered ? styles.sortHovered : null),
          transitionProperty: 'all', // Specify properties to transition
          transitionDuration: '0.3s', // Duration of the transition
          transitionTimingFunction: 'ease-in-out'
        } 
      ]}
      onPress={() => {handleSortPress(filterMode);}}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <Text style={styles.sortByText}>{label}</Text>
      { filterMode === currentSortMode
        ? <View style={styles.doit}><FontAwesome name='filter' size={FontSizes.small} color={Colors.yellowPrime}/></View>
        : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    paddingHorizontal: 5,
  },
  sortHovered: {
    borderRightWidth: 20,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  sortByText: {
    fontSize: FontSizes.small
  },
  doit: {
    position: 'absolute',
    right: -14
    // paddingLeft: 5,
    // marginRight: -20
  }
});