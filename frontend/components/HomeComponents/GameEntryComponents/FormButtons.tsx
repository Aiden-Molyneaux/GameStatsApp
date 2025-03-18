import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Spacing } from '@/constants/Constants';
import ToggleModeBtn from '../../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import { requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';
import { Game } from '../../../../backend/models/gameModel';
import ErrorDisplay from '../../ErrorDisplay';

interface FormButtonsProps {
  formData: GameListItem,
  setGameData: (data: Game) => void,
  closeEditForm: () => void,
  isColorValid: boolean
}

export default function FormButtons({ formData, setGameData, closeEditForm, isColorValid }: FormButtonsProps) {
  const dispatch = useDispatch();
  const [disableSaveBtn, setDisableSaveBtn] = useState(formData.name === '');
  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDisableSaveBtn(!(formData.name) || !isColorValid || formError);
  }, [formData, isColorValid, formError]);

  function handleFormError(errorMessage: string) {
    console.error(errorMessage);
    setFormError(true);
    setErrorMessage(errorMessage);
  }

  function resetFormError() {
    setFormError(false);
    setErrorMessage('');
  }

  async function handleDeleteGamePress() {
    resetFormError();
    
    try {
      const response = await requestDeleteGame(formData.id);
      if ('error' in response) {
        handleFormError(response.error);
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
      titleColour: formData.tempTitleColour,
      headerColour: formData.tempHeaderColour
    };

    try {
      const response = await requestUpdateGame(updatedGame);
      
      if ('error' in response) {
        handleFormError(response.error);
        return;
      }

      setGameData({...updatedGame});
      dispatch(updateGameAction({ game: updatedGame }));
      closeEditForm();
    } catch(err) {
      handleFormError(`An unexpected error occurred: ${err}`);
    }
  }

  function handleCloseGamePress() {
    resetFormError();
    closeEditForm()
  }

  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        {formError && <ErrorDisplay errorMessage={errorMessage} />}
      </View>
      
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
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: Spacing.unit1o5 * 2,
    width: Spacing.unit2,
    paddingHorizontal: Spacing.unit1o5
  },
  errorContainer: {
    minHeight: Spacing.unit,
    marginBottom: Spacing.unit1o5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
