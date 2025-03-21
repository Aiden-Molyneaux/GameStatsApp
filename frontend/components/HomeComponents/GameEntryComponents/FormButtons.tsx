import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Spacing } from '@/constants/Constants';
import ToggleModeBtn from '../../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import { requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';

interface FormButtonsProps {
  formData: GameListItem,
  onFormClose: () => void,
  isColorValid: boolean,
  handleFormError: (errorMessage: string) => void,
  resetFormError: () => void
}

export default function FormButtons({ formData, onFormClose, isColorValid, handleFormError, resetFormError }: FormButtonsProps) {
  const dispatch = useDispatch();
  const [disableSaveBtn, setDisableSaveBtn] = useState((formData.tempTitle || formData.name) === '');

  useEffect(() => {
    const titleValue = formData.tempTitle || formData.name;
    setDisableSaveBtn(!titleValue || !isColorValid);
  }, [formData, isColorValid]);

  async function handleDeleteGamePress() {
    try {
      const response = await requestDeleteGame(formData.id);
      if ('error' in response) {
        handleFormError(response.error.message);
        return;
      }
      dispatch(deleteGameAction({ deletedGameId: response.deletedGameId }));
    } catch(err) {
      handleFormError(`An unexpected error occurred: ${err}`);
    }
  }
  
  async function handleUpdateGamePress() {
    resetFormError();
    
    const updatedGame: GameListItem = {
      ...formData,
      name: formData.tempTitle,
      titleColour: formData.tempTitleColour,
      headerColour: formData.tempHeaderColour
    };

    try {
      const response = await requestUpdateGame(updatedGame);
      
      if ('error' in response) {
        handleFormError(response.error.message);
        return;
      }

      //setGameData({...updatedGame});
      dispatch(updateGameAction({ game: updatedGame }));
      onFormClose();
    } catch(err) {
      handleFormError(`An unexpected error occurred: ${err}`);
    }
  }

  function handleCloseGamePress() {
    resetFormError();
    onFormClose();
  }

  return (
    <View style={styles.container}>      
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: -Spacing.unit,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: Spacing.unit1o5 * 2,
    width: Spacing.unit2,
    paddingHorizontal: Spacing.unit1o5
  },
});
