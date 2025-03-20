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
  const hasBeenPlayed = gameData.hours > 0 && gameData.percentComplete;
  
  // Calculate final expanded height based on content
  const expandedHeight = hasBeenPlayed ? Spacing.unit2 * 1.2 : Spacing.unit2 * 0.85;
  
  // Create animation values for height and opacity
  const animatedHeight = useRef(new Animated.Value(viewMode === 'OPEN' ? expandedHeight : 0)).current;
  const animatedOpacity = useRef(new Animated.Value(viewMode === 'OPEN' ? 1 : 0)).current;

  // UseEffect to animate the height when viewMode changes
  useEffect(() => {
    const isOpen = viewMode === 'OPEN';
    
    // Create two animations: one for height and one for opacity
    const heightAnimation = Animated.timing(animatedHeight, {
      toValue: isOpen ? expandedHeight : 0,
      duration: 300,
      useNativeDriver: false,
    });
    
    const opacityAnimation = Animated.timing(animatedOpacity, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    });
    
    // Run both animations together
    Animated.parallel([heightAnimation, opacityAnimation]).start();
  }, [viewMode, expandedHeight]);

  return (
    <Animated.View 
      style={{ 
        height: animatedHeight, 
        opacity: animatedOpacity,
        overflow: 'hidden',
        position: 'relative',
        marginTop: 0
      }}
    >  
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
  );
}

const styles = StyleSheet.create({
  expandedGame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.screenGray
  },
  gameStats: {
    flex: 1,
    gap: Spacing.unit1o5,
    paddingTop: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5
  },
});