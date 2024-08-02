import React, { forwardRef } from 'react';
import {FlatList} from 'react-native';
import { GameListItem } from '@/store/gameReducer';
import GameEntry from './GameEntry';

interface GameListProps {
  games: GameListItem[],
  sortMode: string
}

function GameList({games, sortMode}: GameListProps, ref: React.Ref<FlatList>) {
  const renderItem = ({ item, index} : { item: GameListItem; index: number}) => (    
    <GameEntry key={item.id} item={item} index={index} sortMode={sortMode}></GameEntry>
  );

  return (
    <FlatList
      ref={ref}
      showsVerticalScrollIndicator={false}
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
    />
  );
}

export default forwardRef(GameList);