import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import { GameListItem } from '@/store/gameReducer';
import StaticStatistic from './StaticStatistic';

interface StaticDetailsProps {
  gameData: GameListItem,
  viewMode: string
}

export default function StaticDetails({ gameData, viewMode }: StaticDetailsProps) {
  const animatedHeight = useRef(new Animated.Value(viewMode === 'OPEN' ? Spacing.unit : 0)).current;

  // UseEffect to animate the height when viewMode changes
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: viewMode === 'OPEN' ? hasBeenPlayed ? Spacing.unit2 * 1.2 : Spacing.unit2 * 0.85 : 0, // Adjust height for open/closed
      duration: 500, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [viewMode]);

  const hasBeenPlayed = gameData.hours > 0 && gameData.percentComplete;

  return (
    <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>  
      <View style={styles.expandedGame}>
        <View style={styles.gameStats}>
          <StaticStatistic 
            label='Hours Played:' 
            value={gameData.hours ? gameData.hours.toString() : 'Never Played'} 
          />
          { hasBeenPlayed && 
            <StaticStatistic
              label='Percent Complete:' 
              value={gameData.percentComplete ? gameData.percentComplete.toString() + '%' : 'N/A'} 
            />
          }
          <StaticStatistic 
            label='Date Purchased:' 
            value={gameData.datePurchased ? String(gameData.datePurchased).split('T')[0] : 'N/A'} 
          />
        </View>
      </View>
    </Animated.View>
  );};

const styles = StyleSheet.create({
  expandedGame: {
    position: 'absolute',
    top: Spacing.unit1o10,
    flexDirection: 'row',
    width: '100%',
    height: '110%',
    backgroundColor: Colors.screenGray
  },
  gameStats: {
    flex: 1,
    gap: Spacing.unit1o5,
    paddingTop: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5
  },
});