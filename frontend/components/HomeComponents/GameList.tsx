import React from 'react';
import {FlatList} from 'react-native';
import { Game } from '@/store/gameListReducer';
import GameEntry from './GameEntry';

interface GameListProps {
  games: Array<Game>,
  sortMode: string
}

export default function GameList({games, sortMode}: GameListProps) {
  const renderItem = ({ item, index} : { item: Game; index: number}) => (    
    <GameEntry key={item.id} item={item} index={index} sortMode={sortMode}></GameEntry>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

