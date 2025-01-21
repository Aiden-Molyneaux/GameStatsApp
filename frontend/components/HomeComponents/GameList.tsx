import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import { GameListItem } from '@/store/gameReducer';
import GameEntry from './GameEntry';

interface GameListProps {
  games: GameListItem[],
  sortMode: string,
  setIsPressed: (data: boolean) => void
}

function GameList({games, sortMode, setIsPressed}: GameListProps, ref: React.Ref<FlatList>) {
  const renderItem = ({ item, index} : { item: GameListItem; index: number}) => (    
    <GameEntry key={item.id} item={item} index={index} sortMode={sortMode} setIsPressed={setIsPressed}/>
  );

  return (
    <FlatList
      ref={ref}
      showsVerticalScrollIndicator={false}
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      inverted={true}
    />
  );
}

export default forwardRef(GameList);