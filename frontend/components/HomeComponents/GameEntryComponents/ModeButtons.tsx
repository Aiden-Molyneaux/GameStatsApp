import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleModeBtn from '../../ToggleModeBtn';
import { Spacing } from '@/constants/Constants';
interface ModeButtonsProps {
  viewMode: string,
  setViewMode: (mode: string) => void
}

export default function ModeButtons({ viewMode, setViewMode }: ModeButtonsProps) {
  return (      
    <View style={styles.container}>
      <ToggleModeBtn
        type='editGame'
        iconName='book'
        pressFunction={() => setViewMode(viewMode === 'OPEN' ? 'CLOSED' : 'OPEN')}
      />
      <ToggleModeBtn
        type='editGame'
        iconName='edit'
        pressFunction={() => setViewMode('EDIT')}
      />
    </View>
  );};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Spacing.unit2,
    paddingHorizontal: Spacing.unit1o5
  }
});