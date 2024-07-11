import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import GameList from '@/components/GameList';
import { Colors, Spacing } from '@/constants/Constants';

export default function Games() {
  return (
    <View style={styles.gamePage}>
      <GameList/>
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  gamePage: {
    flexGrow: 1,
    height: '100%',
    paddingTop: isIOS ? 0 : Spacing.unit2,
    backgroundColor: Colors.blue,
  }
});
