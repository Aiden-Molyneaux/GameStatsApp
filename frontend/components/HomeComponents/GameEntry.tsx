import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { replaceGameAction, Game } from '@/store/gameListReducer';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import GameEntryForm from './GameEntryForm';

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
      <ToggleModeBtn iconName='edit' isDisabled={false} pressFunction={setModeEdit}/>

      <Text style={styles.gameIndex}>{index + 1}</Text>
      <Text style={styles.gameText}>{gameData.name}</Text>
      <Text style={styles.hourText}>{gameData.hours} hours</Text>
      <Text style={styles.hourText}>Owned since {gameData.purchased}</Text>
    </View>
    
  ) : (
    <GameEntryForm
      gameData={gameData}
      setGameData={setGameData}
    />
  );
}

const styles = StyleSheet.create({
  gameEntry: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.unit1o5,
    width: Spacing.unit10 - Spacing.unit,
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
  }
});