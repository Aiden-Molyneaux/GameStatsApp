import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { GameListItem } from '@/store/gameReducer';
import { Colors, Spacing } from '@/constants/Constants';
import GameEntryForm from '../GameEntryForm';
import Index from './Index';
import TitleCard from './TitleCard';
import StaticDetails from './StaticDetails';
import ModeButtons from './ModeButtons';

interface GameEntryProps {
  item: GameListItem,
  index: number,
  setIsPressed: (data: boolean) => void
}

export default function GameEntry({ item, index, setIsPressed }: GameEntryProps) {
  const [ gameData, setGameData] = useState({
    index: index,
    ...item
  });

  useEffect(() => {
    setViewMode(item.mode || 'CLOSED');
  }, [item.mode]);

  const [ viewMode, setViewMode ] = useState(item.mode || 'CLOSED');
  return (
    <>
      { viewMode === 'EDIT' ? (
        <GameEntryForm
          index={index}
          gameData={gameData}
          setGameData={setGameData}
          closeEditForm={() => setViewMode('CLOSED')}
          setIsPressed={setIsPressed}
        />
      ) : (
        <View style={styles.gameEntryContainer}>
          <Index index={index}/>
          <View style={styles.gameEntry}>
            <TitleCard 
              name={gameData.name}
              headerColour={gameData.headerColour}
              titleColour={gameData.titleColour}
            />
            {viewMode === 'OPEN' && (
              <StaticDetails 
                gameData={gameData}
                viewMode={viewMode}
              />
            )}
          </View>
          <ModeButtons 
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gameEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderTopWidth: Spacing.border
  },
  gameEntry: {
    flex: 1,
    marginVertical: Spacing.unit1o5,
  },
});