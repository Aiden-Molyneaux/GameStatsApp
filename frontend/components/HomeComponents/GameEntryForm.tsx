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

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GameEntryFormProps {
  index: string,
  gameData: GameListItem,
  setGameData: (data: Game) => void,
  closeModal: () => void,
  setIsPressed: (data: boolean) => void
}

export default function GameEntryForm({ index, gameData, setGameData, closeModal, setIsPressed }: GameEntryFormProps) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(gameData);
  const [disableSaveBtn, setDisableSaveBtn] = useState(formData.name === '' || !isDateValid(String(formData.datePurchased)));
  
  // Color state management
  const [tempTitleColour, setTempTitleColour] = useState(formData.titleColour);
  const [tempHeaderColour, setTempHeaderColour] = useState(formData.headerColour);
  const [showTitleColourPicker, setShowTitleColourPicker] = useState(false);
  const [showHeaderColourPicker, setShowHeaderColourPicker] = useState(false);
  const setTitleColourPickerWrapper = (value: boolean) => {
    if (value && showHeaderColourPicker) {
      setShowHeaderColourPicker(false);
    }
    setShowTitleColourPicker(value);
  };
  const setHeaderColourPickerWrapper = (value: boolean) => {
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
      id: gameData.id,
      name: formData.name,
      hours: formData.hours,
      datePurchased: formData.datePurchased,
      titleColour: tempTitleColour,
      headerColour: tempHeaderColour,
      mode: VIEW
    };

    try {
      const response = await requestUpdateGame(updatedGame);
      if ('error' in response) {
        console.error(response.error);
        return;
      }
      setGameData(updatedGame);
      dispatch(updateGameAction({ game: updatedGame }));
      closeModal();
    } catch(err) {
      console.error(err);
    }
    setIsPressed(false);
  }

  function handleCloseGamePress() {
    setGameData({...gameData, mode: VIEW});
    
    closeModal();
    setIsPressed(false);
  }

  return (
    <View style={styles.gameEntryContainer}>
      <Text style={styles.gameIndex}>{index + 1}</Text>
      <View style={styles.gameEntry}>
        <View style={{...styles.gameHeader, backgroundColor: tempHeaderColour}}>
          <TextInput
            placeholder='Title'
            style={{
              ...styles.titleInput, 
              color: tempTitleColour, 
              backgroundColor: tempHeaderColour,
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
              <View style={styles.statContainer}>
                <Text style={styles.statTitle}>Hours Played: </Text>
                <TextInput 
                  placeholder='0'
                  style={{ ...styles.statsInput, width: Spacing.unit * 2.5 }}
                  value={ formData.hours ? String(formData.hours) : '' } 
                  onChangeText={ (value) => handleTextInputChange('hours', value) }
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.statContainer}>
                <Text style={styles.statTitle}>Date Purchased: </Text>
                <TextInput 
                  placeholder='YYYY-MM-DD'
                  maxLength={10}
                  style={{ 
                    ...styles.statsInput, 
                    width: Spacing.unit * 2.5,
                    borderBottomColor: isDateValid(formData.datePurchased) ? Colors.orange : Colors.red, 
                  }}
                  value={ formData.datePurchased ? String(formData.datePurchased).split('T')[0] : '' }
                  onChangeText={(value) => {
                    const formattedDate = formatDateInput(value);
                    handleTextInputChange('datePurchased', formattedDate);
                  }}
                  keyboardType='number-pad'
                />
              </View>
              
              <View style={styles.colorPickerSection}>
                <View style={styles.colorPickerControls}>
                  <View style={styles.colorPickerControl}>
                    <Text style={styles.statTitle}>Title Colour: </Text>
                    <View style={styles.colorPickerPreview}>
                      <Pressable style={{...styles.openPickerButton, backgroundColor: tempTitleColour}} onPress={() => setTitleColourPickerWrapper(!showTitleColourPicker)}></Pressable>
                    </View>
                  </View>

                  <View style={styles.colorPickerControl}>
                    <Text style={styles.statTitle}>Header Colour: </Text>
                    <Pressable style={{...styles.openPickerButton, backgroundColor: tempHeaderColour}} onPress={() => setHeaderColourPickerWrapper(!showHeaderColourPicker)}></Pressable>
                  </View>
                </View>

                <View style={styles.colorPickerContainer}>
                  { showTitleColourPicker && <CustomColourPicker colour={tempTitleColour} setColour={setTempTitleColour}/> }
                  { showHeaderColourPicker && <CustomColourPicker colour={tempHeaderColour} setColour={setTempHeaderColour}/> }
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View>
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
  gameIndex: {
    marginHorizontal: Spacing.unit1o3,
    color: Colors.black,
    fontSize: FontSizes.mediumLess,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expandedGame: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.screenGray
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.unit1o5,
    paddingTop: Spacing.unit1o5,
  },
  gameStats: {
    flex: 1,
  },
  statTitle: {
    color: Colors.black,
    fontSize: FontSizes.mediumLess,
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  },
  editBtnContainer: {
    flexDirection: 'row',
    padding: Spacing.unit1o5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  editBtnsRight: {
    flexDirection: 'row',
    gap: Spacing.unit1o5
  },
  datePurchasedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: FontSizes.mediumLess,
  },
  datePurchasedText: {
    fontSize: FontSizes.mediumLess,
    marginHorizontal: Spacing.unit1o10,
  },
  titleInput: {
    width: '80%',
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    borderBottomColor: Colors.orange,
    borderBottomWidth: Spacing.border,
    textAlignVertical: 'top',
    outlineStyle: 'none',
    outlineWidth: 2,
    outlineColor: 'red',
  },
  statsInput: {
    color: Colors.black,
    fontSize: FontSizes.mediumLess,
    borderBottomWidth: Spacing.border,
    marginHorizontal: Spacing.unit1o10,
    borderBottomColor: Colors.orange
  },
  colorPickerSection: {
    justifyContent: 'space-between',
    margin: Spacing.unit1o2,
    marginBottom: 0
  },
  colorPickerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  closePickerButton: {
    height: Spacing.unit,
    width: Spacing.unit,
    backgroundColor: '#fff',
  },
  colorPickerContainer: {
    margin: Spacing.unit1o5,
  }
});
