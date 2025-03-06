import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import DeleteGameEntryBtn from './DeleteGameEntryBtn';
import { Game, requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';
import { CustomColourPicker } from './CustomColourPicker';
import LabeledInput from './LabeledInput';
import Index from './GameEntryComponents/Index';

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

  function formatDateInput(value: string): string | null {
    // Remove any non-digit characters from input
    const numbers = value.replace(/\D/g, '');
    
    // Handle empty input
    if (numbers.length === 0) { return null; }
    
    // Format the date with hyphens
    let formattedDate = numbers;
    if (numbers.length >= 4) {
      formattedDate = numbers.slice(0, 4) + '-' + numbers.slice(4);
    }
    if (numbers.length >= 6) {
      formattedDate = formattedDate.slice(0, 7) + '-' + formattedDate.slice(7);
    }
    
    return formattedDate;
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

  return (
    <View style={styles.gameEntryContainer}>
      <Index index={index}/>
      <View style={styles.gameEntry}>
        <View style={{...styles.gameHeader, backgroundColor: formData.tempHeaderColour}}>
          <TextInput
            placeholder='Title'
            style={{
              ...styles.titleInput, 
              color: formData.tempTitleColour, 
              backgroundColor: formData.tempHeaderColour,
              borderBottomColor: formData.name === '' ? Colors.red : Colors.orange,
            }}
            value={formData.name || ''}
            onChangeText={(value) => handleTextInputChange('name', value)}
            maxLength={60}
            // multiline={true}
            scrollEnabled={false}
          />
        </View>
        
        <View>
          <View style={styles.expandedGame}>
            
            <View style={styles.gameStats}>
              <View style={styles.colorPickerSection}>
                <View style={styles.colorPickerControls}>
                  <View style={styles.colorPickerControl}>
                    <Text>Title Colour: </Text>
                    <View style={styles.colorPickerPreview}>
                      <Pressable style={{...styles.openPickerButton, backgroundColor: formData.tempTitleColour}} onPress={() => setShowTitleColourPickerWrapper(!showTitleColourPicker)}></Pressable>
                    </View>
                  </View>

                  <View style={styles.colorPickerControl}>
                    <Text>Header Colour: </Text>
                    <Pressable style={{...styles.openPickerButton, backgroundColor: formData.tempHeaderColour}} onPress={() => setShowHeaderColourPickerWrapper(!showHeaderColourPicker)}></Pressable>
                  </View>
                </View>

                <View style={styles.colorPickerContainer}>
                  { showTitleColourPicker && <CustomColourPicker colour={formData.tempTitleColour} setColour={(colour) => setFormData({...formData, tempTitleColour: colour})}/> }
                  { showHeaderColourPicker && <CustomColourPicker colour={formData.tempHeaderColour} setColour={(colour) => setFormData({...formData, tempHeaderColour: colour})}/> }
                </View>
              </View>

              <LabeledInput
                label='Hours Played'
                placeholder='0'
                value={formData.hours ? String(formData.hours) : ''}
                onChangeText={(value) => handleTextInputChange('hours', value)}
                keyboardType='number-pad'
                maxLength={6}
              />
              <LabeledInput
                label='Percent Complete'
                placeholder='0%'
                value={formData.percentComplete ? String(formData.percentComplete) : ''}
                onChangeText={(value) => handleTextInputChange('percentComplete', value)}
                keyboardType='number-pad'
                maxLength={3}
              />
              <LabeledInput
                label='Date Purchased'
                placeholder='YYYY-MM-DD'
                value={formData.datePurchased ? String(formData.datePurchased).split('T')[0] : ''}
                onChangeText={(value) => {
                  const formattedDate = formatDateInput(value);
                  handleTextInputChange('datePurchased', formattedDate);
                }}
                keyboardType='number-pad'
                maxLength={10}
              />
            </View>
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
  gameHeader: {
    alignItems: 'center',
    padding: Spacing.unit1o5,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: 10,
  },
  expandedGame: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.screenGray
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameStats: {
    flex: 1,
    gap: Spacing.unit1o10,
    paddingTop: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5
  },
  titleInput: {
    width: '80%',
    fontSize: FontSizes.larger,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
  },
  colorPickerSection: {
    marginBottom: -Spacing.unit1o3
  },
  colorPickerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorPickerControl: {
    alignItems: 'center',
  },
  colorPickerPreview: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  openPickerButton: {
    height: Spacing.unit,
    width: Spacing.unit,
    marginTop: Spacing.unit1o5,
    borderWidth: Spacing.border,
    borderColor: Colors.black,
    borderRadius: Spacing.unit1o5,
  },
  colorPickerContainer: {
    margin: Spacing.unit1o5,
  }
});
