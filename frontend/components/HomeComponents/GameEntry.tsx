import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from './ToggleModeBtn';
import GameEntryForm from './GameEntryForm';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { replaceGameAction, Game } from '@/store/gameListReducer';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GameEntryProps {
  item: Game,
  index: number,
  sortMode: string,
}

export default function GameEntry({item, index, sortMode}: GameEntryProps) {
  const dispatch = useDispatch();
  const [ gameData, setGameData] = useState({
    id: item.id,
    index: index,
    name: item.name,
    hours: item.hours,
    purchased: item.purchased,
    mode: item.mode
  });

  function setModeEdit() {
    const replacementGame: Game = {
      id: gameData.id,
      name: gameData.name,
      hours: gameData.hours,
      purchased: gameData.purchased,
      mode: EDIT
    };

    setGameData({...gameData, mode: EDIT});
    dispatch(replaceGameAction({id: gameData.id, game: replacementGame}));
  }

  return (gameData.mode === VIEW) ? (
    <View style={styles.gameEntry}>
      <ToggleModeBtn name='edit' isDisabled={false} submitFunction={setModeEdit}/>

      <Text style={styles.gameIndex}>{(sortMode === 'entered') ? gameData.id + 1: index + 1}</Text>
      <Text style={styles.gameText}>{gameData.name}</Text>
      <Text style={styles.hourText}>{gameData.hours} hours</Text>
      <Text style={styles.hourText}>Owned since {gameData.purchased}</Text>
    </View>
    
  ) : (
    <GameEntryForm
      gameData={gameData}
      setGameData={setGameData}
      index={gameData.index}
    />
  );
}

const styles = StyleSheet.create({
  gameEntry: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Spacing.unit7,
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o2,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5
  },
  gameIndex: {
    position: 'absolute',
    top: Spacing.unit1o5,
    left: Spacing.unit1o5,
    color: Colors.yellow,
    fontSize: FontSizes.small,
  },
  gameText: {
    color: Colors.yellow,
  },
  hourText: {
    fontSize: FontSizes.mediumLess,
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
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
  editBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  },
  datePurchasedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.unit1o5,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  calendarCloseBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  },
  calendarBtn: {
    alignItems: 'center',
    // size properties
    // margin and padding properties
    padding: Spacing.unit1o5,
    // background properties
    backgroundColor: Colors.yellowPrime,
    // text/font properties
    // border properties
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    // effect properties
    // z-index and other
  },
});

const calendarTheme = {
  monthTextColor: Colors.yellow,
  backgroundColor: Colors.bluePrime,
  calendarBackground: Colors.bluePrime,
  
  selectedDayTextColor: Colors.white,
  todayTextColor: Colors.yellow,
  arrowColor: Colors.yellow,
  
  // dotColor: Colors.yellow,
  indicatorColor: Colors.yellow,
  // selectedDotColor: Colors.yellow,

  dayTextColor: Colors.white,
  textDisabledColor: Colors.black,

  textDayFontFamily: Fonts.monospace,
  textMonthFontFamily: Fonts.monospace,
  textDayHeaderFontFamily: Fonts.monospace,
};