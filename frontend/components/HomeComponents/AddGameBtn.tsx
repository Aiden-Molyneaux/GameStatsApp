import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  addGameAction } from '@/store/gameReducer';
import { Colors, Spacing } from '@/constants/Constants';
import { RootState } from '../../store/store';
import { requestCreateGame } from '@/api/gameRequests';
import { PartialGame } from '../../../backend/models/gameModel';
import CustomButton from './CustomButton';

interface AddGameBtnProps {
  onAddGame: () => void,
  isPressed: boolean,
  setIsPressed: (data: boolean) => void,
  isDisabled: boolean,
}

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default function AddGameBtn({ onAddGame, isPressed, setIsPressed, isDisabled }: AddGameBtnProps) {
  const userId = useSelector((state: RootState) => state.userData.id);
  const dispatch = useDispatch();

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
        
        const defaultGameListItem = { ...response.game, mode: 'NEW' };
        dispatch(addGameAction({ game: defaultGameListItem }));
        onAddGame();
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

