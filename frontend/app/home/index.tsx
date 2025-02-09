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
import Header from '@/components/Header';
import CustomButton from '@/components/HomeComponents/CustomButton';
import OpenCloseBar from '@/components/HomeComponents/OpenCloseBar';

export default function Home() {
  const { games } = useSelector((state: RootState) => state.gameData);

  const [gameCount, setGameCount] = useState(games.length);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [sortMode, setSortMode] = useState('entered');

  const gameListRef = useRef<FlatList>(null);

  const [isPressed, setIsPressed] = useState(false);

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
      <Header/>

      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View>
            <Text style={styles.usernameText}>Sammy Jack</Text>
          </View>
          <GameList
            games={games} 
            sortMode={sortMode}
            ref={gameListRef}
            setIsPressed={setIsPressed}
          />
        </View>

      </View>
      <View style={styles.buttons}>
        <SortBar currentSortMode={sortMode} setSortMode={setSortMode}/>
        <AddGameBtn
          isDisabled={disableAddBtn}
          onAddGame={handleAddGame}
          isPressed={isPressed}
          setIsPressed={setIsPressed}
        />
        <OpenCloseBar currentSortMode={sortMode} setSortMode={setSortMode}/>
      </View>
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.blue,
  },
  screenContainer: {
    flex: 1,
    width: '95%',
    borderWidth: Spacing.borderThick,
    borderColor: Colors.grayPrime,
    borderRadius: 15,
    marginBottom: Spacing.unit1o3,
    elevation: 8
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.trout,
    borderWidth: Spacing.border,
    borderColor: Colors.grayEdge,
    borderRadius: 9,
    overflow: 'hidden'
  },
  buttons: {
    height: Spacing.unit3o2,
    flexDirection: 'row',
    gap: Spacing.unit,
    width: '95%',
    marginBottom: isIOS ? Spacing.unit1o3 : Spacing.unit
  },
  usernameText: {
    padding: 5,
    color: Colors.black,
    textAlign: 'left',
    borderBottomColor: Colors.gray,
    borderBottomWidth: Spacing.border 
  }
});
