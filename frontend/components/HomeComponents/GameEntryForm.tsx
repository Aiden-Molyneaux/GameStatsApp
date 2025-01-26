import React, { useState, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import CustomCalendar from './CustomCalendar';
import ToggleCalendarBtn from './ToggleCalendarBtn';
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
  
  const [showCalendar, setShowCalendar]  = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);
  const [showOtherUI, setShowOtherUI] = useState(true);

  useEffect(() => {
    setDisableSaveBtn(!(gameData.name && gameData.hours && gameData.datePurchased !== null));
  }, [gameData]);

  function openCalendar() {
    setShowCalendar(true);
  }

  function handleTextInputChange(field: string, value: string) {
    setGameData({...gameData, [field]: field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value });
  }

  function formatDateInput(value: string): string {
    // Remove any non-digit characters from input
    const numbers = value.replace(/\D/g, '');
    
    // Handle empty input
    if (numbers.length === 0) {
      return '';
    }
    
    // Format the date with hyphens
    let formattedDate = numbers;
    if (numbers.length >= 4) {
      formattedDate = numbers.slice(0, 4) + '-' + numbers.slice(4);
    }
    if (numbers.length >= 6) {
      formattedDate = formattedDate.slice(0, 7) + '-' + formattedDate.slice(7);
    }
    
    // Limit to 8 digits (YYYYMMDD)
    return numbers.length <= 8 ? formattedDate : formattedDate;
  }

  async function handleDeleteGamePress() {
    setIsPressed(false);
    
    try {
      await requestDeleteGame(gameData.id).then((response) => {
        if('error' in response) {
          console.error(response.error);
          return;
        }

        dispatch(deleteGameAction({ deletedGameId: response.deletedGameId }));
      });
    } catch(err) {
      console.error(err);
      // Handle error in UI
    }
  }
  
  async function handleUpdateGamePress() {
    if (gameData.name === '') { 
      
      return; 
    }

    const updatedGame: GameListItem = {
      id: gameData.id,
      name: gameData.name,
      hours: gameData.hours,
      datePurchased: gameData.datePurchased,
      titleColour: titleColour,
      headerColour: headerColour,
      mode: VIEW
    };

    try {
      await requestUpdateGame(updatedGame).then((response) => {
        if('error' in response) {
          console.error(response.error);
          return;
        }

        setGameData({...gameData, titleColour: titleColour, headerColour: headerColour, mode: VIEW});
        dispatch(updateGameAction({ game: updatedGame }));
        closeModal();
      });
    } catch(err) {
      console.error(err);
    }

    setIsPressed(false);
  }

  function handleCloseGamePress() {
    setGameData({...gameData, mode: VIEW});
    dispatch(updateGameAction({ game: {...gameData, mode: VIEW} }));
    closeModal();
    setIsPressed(false);
  }

  const [titleColour, setTitleColour] = useState(gameData.titleColour);
  const [headerColour, setHeaderColour] = useState(gameData.headerColour);

  return (
    <View style={styles.gameEntryContainer}>
      <Text style={styles.gameIndex}>{index + 1}</Text>
      <View style={styles.gameEntry}>
        <View style={{...styles.gameHeader, backgroundColor: headerColour}}>
          <TextInput
            placeholder='Title'
            style={{
              ...styles.titleInput, 
              color: titleColour, 
              backgroundColor: headerColour,

              borderBottomColor: gameData.name === '' ? Colors.red : Colors.orange,
            }}
            value={gameData.name || ''}
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
                <Text style={styles.statTitle}>Hours: </Text>
                <TextInput 
                  placeholder='0'
                  style={{ ...styles.statsInput, width: Spacing.unit * 2.5 }}
                  value={ gameData.hours ? String(gameData.hours) : '' } 
                  onChangeText={ (value) => handleTextInputChange('hours', value) }
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.statContainer}>
                <Text style={styles.statTitle}>Date Purchased: </Text>
                <TextInput 
                  placeholder='YYYY-MM-DD'
                  maxLength={10}
                  style={{ ...styles.statsInput, width: Spacing.unit * 2.5 }}
                  value={ gameData.datePurchased ? String(gameData.datePurchased).split('T')[0] : '' }
                  onChangeText={(value) => {
                    const formattedDate = formatDateInput(value);
                    handleTextInputChange('datePurchased', formattedDate);
                  }}
                  keyboardType='number-pad'
                />
              </View>
              <View style={styles.colourPickerContainer}>
                <View style={styles.colourPickerInput}>
                  <Text style={styles.statTitle}>Title Colour: </Text>
                  <View style={styles.colorPickerContainer}>
                    <CustomColourPicker colour={gameData.titleColour} setColour={setTitleColour} setShowOtherUI={setShowOtherUI}/>
                  </View>
                </View>

                <View style={styles.colourPickerInput}>
                  <Text style={styles.statTitle}>Header Colour: </Text>
                  <View style={styles.colorPickerContainer}>
                    <CustomColourPicker colour={gameData.headerColour} setColour={setHeaderColour} setShowOtherUI={setShowOtherUI}/>
                  </View>
                </View>

                {/* <View style={styles.colourPickerInput}>
                <Text style={styles.statTitle}>Background Colour: </Text>
                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    onColorSelected={handleColorChange}
                    sliderComponent={Slider}
                  />
                </View>
              </View> */}

              </View>

              <View style={styles.editBtnContainer}>

                <View style={styles.editBtnsRight}>

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
            isDisabled={gameData.name === ''} 
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
    backgroundColor: Colors.trout
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
    color: Colors.yellow,
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
  colourPickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Spacing.unit1o2,
    marginBottom: 0
  },
  colourPickerInput: {
    alignItems: 'center'
  },
});
