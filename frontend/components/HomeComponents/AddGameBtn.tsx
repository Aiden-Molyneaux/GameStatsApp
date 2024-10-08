import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GameListItem, addGameAction } from '@/store/gameReducer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { RootState } from '../../store/store';
import { requestCreateGame } from '@/api/gameRequests';
import { partialGame } from '@/api/gameRequests';

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
    const partialGame: partialGame = {userId: userId, name: '', hours: null, datePurchased: null, mode: 'NEW' };
    
    try {
      requestCreateGame(partialGame).then((response) => {
        if ('game' in response) { 
          const game = response.game;
          
          const defaultGameListItem: GameListItem = {id: game.id, userId: userId, name: '', hours: '', purchasedDate: 'Date Purchased', mode: 'NEW' };
          dispatch(addGameAction(defaultGameListItem));
          onAddGame();
        } else {
          console.error(response.error);
          // Handle error in UI
        }
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