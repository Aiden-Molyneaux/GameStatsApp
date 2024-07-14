import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { Game, addGameAction } from '@/store/gameListReducer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface AddGameBtnProps {
  isDisabled: boolean,
  gameCount: number
}

export default function SortBtn({isDisabled, gameCount}: AddGameBtnProps) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  function handlePlusPress() {
    const defaultGame: Game = {id: gameCount, name: '', hours: '', purchased: 'Date Purchased', mode: 'NEW' };

    dispatch(addGameAction(defaultGame));
  }

  return (
    <Pressable 
      style={[
        isDisabled ? { ...styles.submitGameBtn, backgroundColor: Colors.gray } : styles.submitGameBtn,
        {
          ...(isHovered ? styles.submitHovered : null),
          transitionProperty: 'height, background-color', // Specify properties to transition
          transitionDuration: '0.3s', // Duration of the transition
          transitionTimingFunction: 'ease-in-out', // Timing function for smooth transition
        },
      ]}
      onPress={handlePlusPress} 
      disabled={isDisabled}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <FontAwesome size={FontSizes.medium} name='plus' color={Colors.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitGameBtn: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: Spacing.unit,
    height: Spacing.unit + 10,
    margin: Spacing.unit1o3,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 10,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  submitHovered: {
    height: Spacing.unit
  },
});