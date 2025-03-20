import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/Customs';
import { Spacing } from '@/constants/Constants';

interface IndexProps {
  index: number,
}

export default function Index({ index }: IndexProps) {
  return (
    <View style={styles.gameIndexContainer}>
      <Text style={styles.gameIndex}>{index + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gameIndexContainer: {
    alignItems: 'center',
    width: Spacing.unit,
    zIndex: -1,
  },
  gameIndex: {
    textAlign: 'center'
  },
});