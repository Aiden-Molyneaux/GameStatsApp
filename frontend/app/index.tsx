import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Game } from '@/store/gameListReducer';
import GameList from '@/components/HomeComponents/GameList';
import { Text } from '@/components/Customs';
import SortBtn from '@/components/HomeComponents/SortBtn';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';

export default function Home() {
  const { games } = useSelector((state: RootState) => state.gameListData);

  const [gameCount, setGameCount] = useState(games.length);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [sortMode, setSortMode] = useState('entered');

  // keep track of if we have a game open for edit (or new)
  useEffect(() => {
    setDisableAddBtn(games.some((game: Game) => (game.mode === 'NEW' || game.mode === 'EDIT')));
  }, [games]);

  useEffect(() => {
    setGameCount(games.length);
  }, [games]);

  return (
    <View style={styles.homePage}>
      <Text style={styles.playTimeText}>Your Play-Time</Text>

      <Text style={styles.filterByText}>Filter by</Text>

      <View style={styles.sortBtnContainer}>
        <SortBtn
          filterMode={'hours'}
          label={'Hours'}
          currentSortMode={sortMode}
          setSortMode={setSortMode}
        />

        <SortBtn
          filterMode={'purchased'}
          label={'Date purchased'}
          currentSortMode={sortMode}
          setSortMode={setSortMode}
        />
  
        <SortBtn
          filterMode={'entered'}
          label={'Default'}
          currentSortMode={sortMode}
          setSortMode={setSortMode}
        />
      </View>

      <GameList games={games} sortMode={sortMode}/>

      <AddGameBtn
        isDisabled={disableAddBtn}
        gameCount={gameCount}
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
    paddingTop: isIOS ? 0 : Spacing.unit2,
    backgroundColor: Colors.blue,
  },
  playTimeText: {
    marginBottom: Spacing.unit1o5,
    color: Colors.yellow,
    fontSize: FontSizes.large,
  },
  filterByText: {
    paddingBottom: 3, 
    color: Colors.yellow,
    fontSize: FontSizes.small,
    borderBottomWidth: Spacing.border / 2,
    borderColor: Colors.yellowPrime
  },
  sortBtnContainer: {
    flexDirection: 'row'
  }
});
