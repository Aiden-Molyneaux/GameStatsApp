import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Platform, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/store';
import { GameListItem } from '@/store/gameReducer';
import GameList from '@/components/HomeComponents/GameList';
import { Text } from '@/components/Customs';
import SortBar from '@/components/HomeComponents/SortBar';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';

export default function Home() {
  const { games } = useSelector((state: RootState) => state.gameData);

  const [gameCount, setGameCount] = useState(games.length);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [sortMode, setSortMode] = useState('entered');

  const gameListRef = useRef<FlatList>(null);

  const state = store.getState();

  console.log(state);

  // keep track of if we have a game open for edit (or new)
  useEffect(() => {
    setDisableAddBtn(games.some((game: GameListItem) => (game.mode === 'NEW' || game.mode === 'EDIT')));
    setGameCount(games.length);
  }, [games]);

  function handleAddGame() {
    setTimeout(() => {
      gameListRef.current?.scrollToEnd({ animated: true }); // Scroll to the end when a new game is added
    }, 500);
  };

  return (
    <View style={styles.homePage}>
      <Text style={styles.playTimeText}>Your Play-Time</Text>

      <SortBar currentSortMode={sortMode} setSortMode={setSortMode}/>

      <GameList
        games={games} 
        sortMode={sortMode}
        ref={gameListRef}
      />

      <AddGameBtn
        isDisabled={disableAddBtn}
        gameCount={gameCount}
        onAddGame={handleAddGame}
      />
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: isIOS ? 0 : Spacing.unit3o2,
    backgroundColor: Colors.blue,
  },
  playTimeText: {
    marginVertical: Spacing.unit1o3,
    color: Colors.yellow,
    fontSize: FontSizes.large,
  }
});
