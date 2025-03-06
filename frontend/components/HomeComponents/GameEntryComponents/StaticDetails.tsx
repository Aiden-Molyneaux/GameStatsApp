import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import { GameListItem } from '@/store/gameReducer';

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

  const hasBeenPlayed = gameData.hours > 0;

  return (
    <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>  
      <View style={styles.expandedGame}>
        <View style={styles.gameStats}>
          <View style={styles.statContainer}>
            <Text>Hours Played:</Text><Text>{gameData.hours ? gameData.hours : 'Never Played'}</Text>
          </View>
            { hasBeenPlayed && <View style={styles.statContainer}>
              <Text>Percent Complete:</Text><Text>{gameData.percentComplete}</Text>
            </View> }
          <View style={styles.statContainer}>
            <Text>Date Purchased:</Text><Text>{gameData.datePurchased ? String(gameData.datePurchased).split('T')[0] : 'N/A'}</Text>
          </View>
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
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gameStats: {
    flex: 1,
    gap: Spacing.unit1o5,
    paddingTop: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5
  },
});