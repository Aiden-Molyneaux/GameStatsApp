import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import DeleteGameEntryBtn from './DeleteGameEntryButton';
import { Game, requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';
import { CustomColourPicker } from './CustomColourPicker';
import LabeledInput from '../LabeledInput';
import Index from './Index';
import TitleInput from './TitleInput';
import StatisticInputs from './StatisticInputs';
import ColourInputs from './ColourInputs';

interface GameEntryFormProps {
  index: number,
  gameData: GameListItem,
  setGameData: (data: Game) => void,
  closeEditForm: () => void,
  setIsPressed: (data: boolean) => void
}

export default function GameEntryForm({ index, gameData, setGameData, closeEditForm, setIsPressed }: GameEntryFormProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ 
    ...gameData, 
    tempTitleColour: gameData.titleColour, 
    tempHeaderColour: gameData.headerColour 
  });
  const [disableSaveBtn, setDisableSaveBtn] = useState(formData.name === '' || !isDateValid(String(formData.datePurchased)));
  
  // Color state management
  const [showTitleColourPicker, setShowTitleColourPicker] = useState(false);
  const [showHeaderColourPicker, setShowHeaderColourPicker] = useState(false);
  const setShowTitleColourPickerWrapper = (value: boolean) => {
    if (value && showHeaderColourPicker) {
      setShowHeaderColourPicker(false);
    }
    setShowTitleColourPicker(value);
  };
  const setShowHeaderColourPickerWrapper = (value: boolean) => {
    if (value && showTitleColourPicker) {
      setShowTitleColourPicker(false);
    }
    setShowHeaderColourPicker(value);
  };

  useEffect(() => {
    setDisableSaveBtn(!(formData.name && isDateValid(formData.datePurchased)));
  }, [formData]);

  function handleTextInputChange(field: string, value: string) {
    setFormData({
      ...formData, 
      [field]: field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value 
    });
  }

  function isDateValid(date: Date | null): boolean {
    // null date is valid
    if (!date) return true;

    // a valid date must be 10 characters long
    if (String(date).length !== 10) return false;

    // a valid date must be a valid date
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  }

  async function handleDeleteGamePress() {
    setIsPressed(false);
    try {
      const response = await requestDeleteGame(gameData.id);
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

  function setColourData(headerColour: string, titleColour: string) {
    setFormData({
      ...formData,
      tempTitleColour: titleColour,
      tempHeaderColour: headerColour
    });
  }

  return (
    <View style={styles.gameEntryContainer}>
      <Index index={index}/>
      <View style={styles.gameEntry}>
        <TitleInput
          name={formData.name}
          tempHeaderColour={formData.tempHeaderColour}
          tempTitleColour={formData.tempTitleColour}
          handleTextInputChange={handleTextInputChange}
        />
        
        <View style={styles.expandedGame}>
          <View style={styles.gameStats}>
            <ColourInputs
              tempHeaderColour={formData.tempHeaderColour}
              tempTitleColour={formData.tempTitleColour}
              setColourData={setColourData}
            />

            <StatisticInputs
              formData={formData}
              handleTextInputChange={handleTextInputChange}
            />
          </View>
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <ToggleModeBtn
            type='editGame'
            iconName='save' 
            isDisabled={disableSaveBtn} 
            pressFunction={handleUpdateGamePress} 
          />
        </View>
        <View style={styles.button}>
          <ToggleModeBtn
            type='editGame'
            iconName='thumbs-down' 
            isDisabled={false} 
            pressFunction={handleCloseGamePress}
          />
        </View>
        <View style={styles.button}>
          <DeleteGameEntryBtn pressFunction={handleDeleteGamePress}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    width: Spacing.unit2,
    paddingHorizontal: Spacing.unit1o5
  },
  button: {
    alignSelf: 'center',
    margin: Spacing.unit1o5,
  },
  gameEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderTopWidth: Spacing.border
  },
  gameEntry: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: Spacing.unit1o5
  },
  expandedGame: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.screenGray
  },
  gameStats: {
    flex: 1,
    gap: Spacing.unit1o10,
    paddingTop: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5
  },
});
