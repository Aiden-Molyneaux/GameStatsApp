import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { GameListItem } from '@/store/gameReducer';
import GameList from '@/components/HomeComponents/GameList';
import TopScreenBar from '../TopScreenBar';

interface GameScreenProps {
  gameListRef: React.RefObject<FlatList<GameListItem>>;
}

export default function GameScreen({ gameListRef }: GameScreenProps) {
  return (
    <View style={styles.gameScreen}>
      <TopScreenBar/>
      <GameList ref={gameListRef}/>
    </View>
  );
}

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
    width: '100%',
  }
});
