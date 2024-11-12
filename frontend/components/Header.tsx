import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Customs'; 
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

export default function Header() {
  return (
    <View>
      <Text style={styles.headerText}>In-Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    margin: Spacing.unit1o3,
    color: Colors.white,
    fontSize: FontSizes.header,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadow: `${Colors.orange} 1px 1px 4px`
  }
});