import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { sortGamesAction } from '@/store/gameReducer';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text} from '@/components/Customs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CustomButton from './CustomButton';

interface SortBtnProps {
  filterMode: string,
  iconName: string,
  currentSortMode: string,
  setSortMode: (data: string) => void
}

export default function SortBtn({filterMode, iconName, currentSortMode, setSortMode}: SortBtnProps) {
  const dispatch = useDispatch();

  function handleSortPress() {
    dispatch(sortGamesAction({sort: filterMode})); 
    setSortMode(filterMode);
  }

  return (
  // <Pressable
  //   style={[(filterMode === currentSortMode) ? {...styles.sortBtn, ...styles.sortHovered} : styles.sortBtn,
  //     {...(isHovered ? styles.sortHovered : null),
  //       transitionProperty: 'all', // Specify properties to transition
  //       transitionDuration: '0.3s', // Duration of the transition
  //       transitionTimingFunction: 'ease-in-out'
  //     } 
  //   ]}
  //   onPress={() => {handleSortPress(filterMode);}}
  //   onHoverIn={() => setIsHovered(true)}
  //   onHoverOut={() => setIsHovered(false)}
  // >
  //   {/* <Text style={styles.sortByText}>{label}</Text>
  //   { filterMode === currentSortMode
  //     ? <View style={styles.doit}><FontAwesome name='filter' size={FontSizes.small} color={Colors.orange}/></View>
  //     : null} */}
  //   <View style={styles.topBtn}>
  //     <View style={styles.hmm}>  
  //       <FontAwesome size={FontSizes.mediumLess} name='hourglass' color={Colors.white} />
  //     </View>

    //   </View>
    //   <View style={styles.bottomBtn}></View>
    // </Pressable>
    <CustomButton
      size={'small'}
      iconName={iconName}
      isDisabled={false}
      isPressed={filterMode === currentSortMode}
      pressFunction={handleSortPress}
    />
  );
}

const styles = StyleSheet.create({
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  // sortHovered: {
  //   borderRightWidth: 20,
  //   borderTopRightRadius: 5,
  //   borderBottomRightRadius: 5,
  // },
  // sortByText: {
  //   fontSize: FontSizes.mediumLess
  // },
  // doit: {
  //   position: 'absolute',
  //   right: -14
  //   // paddingLeft: 5,
  //   // marginRight: -20
  // },
  topBtn: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing.unit,
    width: Spacing.unit3o2,
    backgroundColor: Colors.gray,
    borderWidth: Spacing.border,
    borderRadius: 15,
    zIndex: 3
  },
  bottomBtn: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: Spacing.unit3o2,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    zIndex: 0
  },
  addBtnHovered: {
    height: Spacing.unit3o2 - Spacing.unit1o5,
  },
  hmm: {
    textShadow: `${Colors.black} 1px 1px 1px`
  }
});