import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { GameListItem, updateGameAction, deleteGameAction, setIdToPositionAction } from '@/store/gameReducer';
import CustomCalendar from './CustomCalendar';
import ToggleCalendarBtn from './ToggleCalendarBtn';
import DeleteGameEntryBtn from './DeleteGameEntryBtn';
import { Game, requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GameEntryFormProps {
  gameData: GameListItem;
  setGameData: (data: unknown) => null;
}

export default function GameEntryForm({gameData, setGameData}: GameEntryFormProps) {
  const dispatch = useDispatch();
  
  const [showCalendar, setShowCalendar]  = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  useEffect(() => {
    setDisableSaveBtn(!(gameData.name && gameData.hours && gameData.datePurchased !== null));
  }, [gameData]);

  function openCalendar() {
    setShowCalendar(true);
  }

  function handleTextInputChange(field: string, value: string) {
    setGameData({...gameData, [field]: field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value });
  }

  async function handleDeleteGamePress() {
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
    if (gameData.name !== '' && gameData.hours && gameData.datePurchased) {
      const updatedGame: GameListItem = {
        id: gameData.id,
        name: gameData.name,
        hours: gameData.hours,
        datePurchased: gameData.datePurchased,
        mode: VIEW
      };

      try {
        await requestUpdateGame(updatedGame).then((response) => {
          if('error' in response) {
            console.error(response.error);
            return;
          }

          setGameData({...gameData, mode: VIEW});
          dispatch(updateGameAction({ game: updatedGame }));
        });
      } catch(err) {
        console.error(err);
      }
    }
  }

  return (
    <View style={styles.gameEntryForm}>
      <Text style={styles.addGameText}>
        {gameData.mode === EDIT ? 'Edit Game Entry' : 'New Game Entry'}
      </Text>

      <DeleteGameEntryBtn pressFunction={handleDeleteGamePress}/>

      <ToggleModeBtn iconName='save' isDisabled={disableSaveBtn} pressFunction={handleUpdateGamePress}/>

      <TextInput
        placeholder='Title'
        style={styles.input}
        value={gameData.name ? gameData.name : ''}
        onChangeText={(value) => handleTextInputChange('name', value)}
      />

      <TextInput 
        placeholder='Hours played'
        style={styles.input}
        value={gameData.hours ? String(gameData.hours) : '0'} 
        onChangeText={(value) => handleTextInputChange('hours', value)}
        keyboardType='numeric'
      />

      { showCalendar ? (
        <CustomCalendar 
          gameData={gameData}
          setGameData={setGameData}
          setShowCalendar={setShowCalendar}
        />
      ) : (
        <View style={styles.datePurchasedContainer}>
          <Text style={
            (/^\d{4}-\d{2}-\d{2}$/.test(String(gameData.datePurchased))) 
              ? {...styles.datePurchasedText, color: Colors.white}
              : {...styles.datePurchasedText, color: Colors.gray}
          }
          >
            {String(gameData.datePurchased)}
          </Text>

          <ToggleCalendarBtn 
            styleType={'openBtn'} 
            iconName='calendar' 
            pressFunction={openCalendar}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameEntryForm: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o3,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5
  },
  addGameText: {
    marginBottom: Spacing.unit1o5,
    color: Colors.yellow,
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  datePurchasedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  datePurchasedText: {
    margin: Spacing.unit1o5,
    color: Colors.gray,
    fontSize: FontSizes.mediumLess,
  }
});