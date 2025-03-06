import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  addGameAction } from '@/store/gameReducer';
import { Colors, Spacing } from '@/constants/Constants';
import { RootState } from '../../store/store';
import { requestCreateGame } from '@/api/gameRequests';
import { PartialGame } from '../../../backend/models/gameModel';
import CustomButton from './CustomButton';

interface AddGameButtonProps {
  gameListRef: React.RefObject<FlatList>,
  isDisabled: boolean,
}

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default function AddGameButton({ gameListRef, isDisabled }: AddGameButtonProps) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.userData.id);

  const [isPressed, setIsPressed] = useState(false);

  function handleAddGame() {
    setTimeout(() => {
      gameListRef.current?.scrollToEnd({ animated: true }); // Scroll to the end when a new game is added
    }, 500);
  };


  async function handlePlusPress() {
    const newGame: PartialGame = { 
      userId: userId, 
      name: '', 
      hours: 0, 
      datePurchased: null, 
      titleColour: Colors.white, 
      headerColour: Colors.black 
    };
    setIsPressed(true);
    await timeout(300);
    setIsPressed(false);
    try {
      await requestCreateGame(newGame).then((response) => {
        if ('error' in response) { 
          console.error(response.error);
          // Handle error in UI
          return;
        }
        
        const defaultGameListItem = { ...response.game, mode: 'EDIT' };
        dispatch(addGameAction({ game: defaultGameListItem }));
        handleAddGame();
      });
    } catch(err) {
      console.error(err);
      setIsPressed(false);
      // Handle error in UI
    }
  }

  return (
    <CustomButton
      size={'big'}
      iconName='plus'
      isDisabled={isDisabled}
      isPressed={isPressed}
      pressFunction={handlePlusPress}
    />
  );
}

