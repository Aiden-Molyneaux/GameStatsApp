import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { GameListItem, replaceGameAction, deleteGameAction, setIdToPositionAction } from '@/store/gameReducer';
import CustomCalendar from './CustomCalendar';
import ToggleCalendarBtn from './ToggleCalendarBtn';
import DeleteGameEntryBtn from './DeleteGameEntryBtn';
import { requestDeleteGame } from '@/api/gameRequests';

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
    setDisableSaveBtn(!(gameData.name && gameData.hours && gameData.purchasedDate !== 'Date Purchased'));
  }, [gameData]);

  function openCalendar() {
    setShowCalendar(true);
  }

  function saveGameEntry() {
    if (gameData.name && gameData.hours && gameData.purchasedDate) {
      const replacementGame: GameListItem = {
        id: gameData.id,
        name: gameData.name,
        hours: gameData.hours,
        purchasedDate: gameData.purchasedDate,
        mode: VIEW
      };

      setGameData({...gameData, mode: VIEW});
      dispatch(replaceGameAction({id: gameData.id, game: replacementGame}));
    }
  }

  function handleTextInputChange(field: string, value: string) {
    setGameData({...gameData, [field]: field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value });
  }

  // const deleteAndRepositionGames = createAsyncThunk(
  //   'games/deleteAndReposition',
  //   async (gameId: number, { dispatch }) => {
  //     await dispatch(deleteGameAction(gameId));
  //     await dispatch(setIdToPositionAction());
  //   }
  // );

  function handleDeleteGameClick() {
    try {
      console.log(gameData.id);
      requestDeleteGame(gameData.id).then((response) => {
        if ('deletedGameId' in response) {
          dispatch(deleteGameAction(response.deletedGameId));
        } else {
          console.error(response.error);
          // Handle failure in UI
        }
      });
    } catch(err) {
      console.error(err);
      // Handle error in UI
    }
  }

  return (
    <View style={styles.gameEntryForm}>
      <Text style={styles.addGameText}>
        {gameData.mode === EDIT ? 'Edit Game Entry' : 'New Game Entry'}
      </Text>

      <DeleteGameEntryBtn clickFunction={handleDeleteGameClick}/>

      <ToggleModeBtn iconName='save' isDisabled={disableSaveBtn} pressFunction={saveGameEntry}/>

      <TextInput
        placeholder='Title'
        style={styles.input}
        value={gameData.name} 
        onChangeText={(value) => handleTextInputChange('name', value)}
      />

      <TextInput 
        placeholder='Hours played'
        style={styles.input}
        value={String(gameData.hours)} 
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
            (/^\d{4}-\d{2}-\d{2}$/.test(gameData.purchasedDate)) 
              ? {...styles.datePurchasedText, color: Colors.white}
              : {...styles.datePurchasedText, color: Colors.gray}
          }
          >
            {gameData.purchasedDate}
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