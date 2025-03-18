import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, Spacing } from '@/constants/Constants';
import ToggleModeBtn from '../../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import DeleteGameEntryBtn from './DeleteGameEntryButton';
import { requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';
import { Game } from '../../../../backend/models/gameModel';

interface FormButtonsProps {
  formData: GameListItem,
  setGameData: (data: Game) => void,
  closeEditForm: () => void,
  setIsPressed: (data: boolean) => void,
  isColorValid: boolean
}

export default function FormButtons({ formData, setGameData, closeEditForm, setIsPressed, isColorValid }: FormButtonsProps) {
  const dispatch = useDispatch();
  const [disableSaveBtn, setDisableSaveBtn] = useState(formData.name === '');

  useEffect(() => {
    setDisableSaveBtn(!(formData.name) || !isColorValid);
  }, [formData, isColorValid]);

  async function handleDeleteGamePress() {
    setIsPressed(false);
    try {
      const response = await requestDeleteGame(formData.id);
      if ('error' in response) {
        console.error(response.error);
        return;
      }
      dispatch(deleteGameAction({ deletedGameId: response.deletedGameId }));
    } catch(err) {
      console.error(err);
      // Handle error in UI
    }
  }
  
  async function handleUpdateGamePress() {
    const updatedGame: GameListItem = {
      ...formData,
      titleColour: formData.tempTitleColour,
      headerColour: formData.tempHeaderColour
    };

    try {
      const response = await requestUpdateGame(updatedGame);
      if ('error' in response) {
        console.error(response.error);
        return;
      }
      setGameData({...updatedGame});
      dispatch(updateGameAction({ game: updatedGame }));
      closeEditForm();
    } catch(err) {
      console.error(err);
    }
    setIsPressed(false);
  }

  function handleCloseGamePress() {
    closeEditForm();
    setIsPressed(false);
  }

  return (
    <View style={styles.buttonContainer}>
      <ToggleModeBtn
        type='editGame'
        iconName='save' 
        isDisabled={disableSaveBtn} 
        pressFunction={handleUpdateGamePress} 
      />
    
      <ToggleModeBtn
        type='editGame'
        iconName='thumbs-down' 
        pressFunction={handleCloseGamePress}
      />
      
      <ToggleModeBtn
        type='delete'
        iconName='trash'
        pressFunction={handleDeleteGamePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    gap: Spacing.unit1o5 * 2,
    width: Spacing.unit2,
    paddingHorizontal: Spacing.unit1o5
  }
});
