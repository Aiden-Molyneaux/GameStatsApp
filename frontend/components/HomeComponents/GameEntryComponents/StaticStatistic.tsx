import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';

interface StaticStatisticProps {
  label: string;
  value: string;
}

export default function StaticStatistic({ label, value }: StaticStatisticProps) {
  return (
    <View style={styles.statContainer}>
      <Text>{label}</Text><Text>{value}</Text>
    </View>
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