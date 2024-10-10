import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  GameListItem, PartialGameListItem, addGameAction } from '@/store/gameReducer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { RootState } from '../../store/store';
import { requestCreateGame } from '@/api/gameRequests';
import { Game, PartialGame } from '../../../backend/models/gameModel';

interface AddGameBtnProps {
  isDisabled: boolean,
  gameCount: number,
  onAddGame: () => void
}

export default function AddGameBtn({ isDisabled, gameCount, onAddGame }: AddGameBtnProps) {
  const userId = useSelector((state: RootState) => state.userData.id);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  async function handlePlusPress() {
    const newGame: PartialGame = { userId: userId, name: ' ', hours: 0, datePurchased: null };
    
    try {
      await requestCreateGame(newGame).then((response) => {
        if ('error' in response) { 
          console.error(response.error);
          // Handle error in UI
          return;
        }
        
        const defaultGameListItem = { ...response.game, mode: 'NEW' };
        dispatch(addGameAction({ game: defaultGameListItem }));
        onAddGame();
      });
    } catch(err) {
      console.error(err);
      // Handle error in UI
    }
  }

  return (
    <View style={styles.btnContainer}>
      <Pressable 
        style={[
          isDisabled ? { ...styles.addGameBtn, backgroundColor: Colors.gray } : styles.addGameBtn,
          {
            ...(isHovered ? styles.addBtnHovered : null),
            transitionProperty: 'height, background-color', // Specify properties to transition
            transitionDuration: '0.3s', // Duration of the transition
            transitionTimingFunction: 'ease-in-out', // Timing function for smooth transition
          },
        ]}
        disabled={isDisabled}
        onPress={handlePlusPress} 
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <FontAwesome size={FontSizes.medium} name='plus' color={Colors.white} />
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  btnContainer: {
    height: Spacing.unit + 10,
    marginTop: Spacing.unit1o3,
    justifyContent: 'flex-end'
  },
  addGameBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Spacing.unit,
    height: Spacing.unit + 10,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 10,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  addBtnHovered: {
    height: Spacing.unit
  }
});