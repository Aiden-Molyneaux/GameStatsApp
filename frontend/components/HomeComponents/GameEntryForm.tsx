import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
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
  index: string,
  gameData: GameListItem;
  setGameData: (data: unknown) => null;
  closeModal: () => void;
}

export default function GameEntryForm({ index, gameData, setGameData, closeModal }: GameEntryFormProps) {
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
          closeModal();
        });
      } catch(err) {
        console.error(err);
      }
    }
  }

  return (
    <View style={styles.gameEntry}>
      <View style={styles.gameHeader}>
        <Text style={styles.gameIndex}>{index + 1}</Text>
        <TextInput
          placeholder='Title'
          style={styles.titleInput}
          value={gameData.name ? gameData.name : ''}
          onChangeText={(value) => handleTextInputChange('name', value)}
        />
      </View>
        
      <View>
        <View style={styles.expandedGame}>
          <View style={styles.gameStats}>
            <View style={styles.statContainer}>
              <Text style={styles.statTitle}>Hours: </Text>
              <TextInput 
                placeholder='Hours played'
                style={{...styles.statsInput, width: Spacing.unit * 2.3}}
                value={gameData.hours ? String(gameData.hours) : '0'} 
                onChangeText={(value) => handleTextInputChange('hours', value)}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.statContainer}>
              <Text style={styles.statTitle}>Date Purchased: </Text>
              { showCalendar ? (
                <CustomCalendar 
                  gameData={gameData}
                  setGameData={setGameData}
                  setShowCalendar={setShowCalendar}
                />
              ) : (
                <View style={styles.datePurchasedContainer}>
                  <TextInput 
                    placeholder='0'
                    style={{...styles.statsInput, width: Spacing.unit * 2.3}}
                    value={gameData.datePurchased ? String(gameData.datePurchased).split('T')[0] : 'zilch'} 
                    onChangeText={(value) => handleTextInputChange('datePurchased', value)}
                  />

                  <ToggleCalendarBtn 
                    styleType={'openBtn'} 
                    iconName='calendar' 
                    pressFunction={openCalendar}
                  />
                </View>
              )}
            </View>

            <View style={styles.editBtnContainer}>
              <DeleteGameEntryBtn pressFunction={handleDeleteGamePress}/>
              <ToggleModeBtn
                type='editGame'
                iconName='save' 
                isDisabled={false} 
                pressFunction={handleUpdateGamePress} 
              />
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gameEntry: {
    flexDirection: 'column',
    gap: Spacing.unit1o5,
    width: Spacing.unit10 - Spacing.unit,
    margin: Spacing.unit1o5 / 5,
    // padding: Spacing.unit1o5,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderLeftColor: Colors.blue,
    borderRightColor: Colors.blue,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.unit1o5,
    paddingBottom: 0
  },
  gameIndex: {
    marginRight: Spacing.unit1o2,
    color: Colors.yellow,
    fontSize: FontSizes.mediumLess,
    fontWeight: 'bold',
    textShadow: `${Colors.yellowPrime} 1px 1px 5px`
  },
  gameText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadow: `${Colors.black} 1px 1px 1px`
  },
  expandedGame: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.blueMid
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
    whiteSpace: 'nowrap'
  },
  editBtnContainer: {
    flexDirection: 'row',
    padding: Spacing.unit1o5,
    alignItems: 'center',
    justifyContent: 'space-between'
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
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadow: `${Colors.black} 1px 1px 1px`,
    borderBottomColor: Colors.yellowPrime,
    borderBottomWidth: Spacing.border
  },
  statsInput: {
    color: Colors.white,
    fontSize: FontSizes.mediumLess,
    borderBottomColor: Colors.yellowPrime,
    borderBottomWidth: Spacing.border,
    marginHorizontal: Spacing.unit1o10,
  },
});