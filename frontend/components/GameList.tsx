import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Text } from './Customs';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import GameEntry from './GameEntry';
import { GameListItem, addGameAction, sortGamesAction } from '@/store/gameReducer';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function GameList() {
  const dispatch = useDispatch();
  const { games } = useSelector((state: RootState) => state.gameData);
  const [gameCount, setGameCount] = useState(games.length);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sortMode, setSortMode] = useState('entered');

  // keep track of if we have a game open for edit (or new)
  useEffect(() => {
    setDisableAddBtn(games.some((game: GameListItem) => (game.mode === 'NEW' || game.mode === 'EDIT')));
  }, [games]);

  useEffect(() => {
    setGameCount(games.length);
  }, [games]);

  function handlePlusPress() {
    const defaultGame: GameListItem = {id: gameCount, name: '', hours: '', datePurchased: 'Date Purchased', mode: 'NEW' };

    dispatch(addGameAction(defaultGame));
  }

  function handleSortPress(sortModeStr: string) {
    dispatch(sortGamesAction({sort: sortModeStr})); 
    setSortMode(sortModeStr);
  }

  const renderItem = ({ item, index} : { item: GameListItem; index: number}) => (    
    <GameEntry key={item.id} item={item} index={index} sortMode={sortMode}></GameEntry>
  );

  return (
    <View style={styles.gameListContainer}>
      <Text style={styles.gameListText}>Your Play-Time</Text>

      <Text style={styles.filterByText}>Filter by</Text>
      
      <View style={styles.sortBtnContainer}>
        <Pressable 
          style={ sortMode === 'hours' 
            ? { ...styles.sortBtn, backgroundColor: Colors.gray } 
            : styles.sortBtn
          } 
          onPress={ () => { handleSortPress('hours'); } }
        >
          <Text style={styles.sortByText}>Hours</Text>
        </Pressable>
        
        <Pressable 
          style={(sortMode === 'datePurchased') 
            ? {...styles.sortBtn, backgroundColor: Colors.gray} 
            : styles.sortBtn} 
          onPress={() => {handleSortPress('datePurchased');}}
        >
          <Text style={styles.sortByText}>Date Purchased</Text>
        </Pressable>
        
        <Pressable 
          style={(sortMode === 'entered') 
            ? {...styles.sortBtn, backgroundColor: Colors.gray} 
            : styles.sortBtn
          } 
          onPress={() => {handleSortPress('entered');}}
        >
          <Text style={styles.sortByText}>Default</Text>
        </Pressable>
      </View>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />

      <Pressable 
        style={[
          disableAddBtn ? { ...styles.submitGameBtn, backgroundColor: Colors.gray } : styles.submitGameBtn,
          {
            ...(isHovered ? styles.submitHovered : null),
            transitionProperty: 'height, background-color', // Specify properties to transition
            transitionDuration: '0.3s', // Duration of the transition
            transitionTimingFunction: 'ease-in-out', // Timing function for smooth transition
          },
        ]}
        onPress={handlePlusPress} 
        disabled={disableAddBtn}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <FontAwesome size={FontSizes.medium} name='plus' color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filterByText: {
    paddingBottom: 3, 
    color: Colors.yellowPrime,
    fontSize: FontSizes.small,
    borderBottomWidth: Spacing.border / 2,
    borderColor: Colors.yellowPrime
  },
  gameListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sortBtnContainer: {
    flexDirection: 'row'
  },
  gameListText: {
    marginBottom: Spacing.unit1o5,
    color: Colors.yellow,
    fontSize: FontSizes.large,
  },
  sortBtn: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // width: Spacing.unit,
    height: Spacing.unit1o2 + 8,
    margin: Spacing.unit1o5,

    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 5,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 5
  },
  sortByText: {
    fontSize: FontSizes.small,
  },
  submitGameBtn: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: Spacing.unit,
    height: Spacing.unit + 10,
    margin: Spacing.unit1o3,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 10,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  submitHovered: {
    height: Spacing.unit
  },
});
