import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';
import { GameListItem } from '@/store/gameReducer';
import GameEntry from './GameEntryComponents/GameEntry';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface GameListProps {
  sortMode: string,
  setIsPressed: (data: boolean) => void
}

function GameList({sortMode, setIsPressed}: GameListProps, ref: React.Ref<FlatList>) {
  const { games } = useSelector((state: RootState) => state.gameData);

  const renderItem = ({ item, index} : { item: GameListItem; index: number}) => (    
    <GameEntry item={item} index={index} setIsPressed={setIsPressed}/>
  );

  return (
    <FlatList
      ref={ref}
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      inverted={true}
    />
  );
}

export default forwardRef(GameList);