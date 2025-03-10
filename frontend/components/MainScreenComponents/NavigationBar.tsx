import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Spacing } from '@/constants/Constants';
import NavigationButton from './NavigationButton';

interface NavigationBarProps {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

export default function NavigationBar({ currentScreen, setCurrentScreen }: NavigationBarProps) {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);

  return (
    <View style={styles.navigationBar}>
      <NavigationButton
        labelText='Games'
        iconName='gamepad'
        isPressed={isAuthenticated && currentScreen === 'games'}
        onPress={() => setCurrentScreen('games')}
        disabled={!isAuthenticated}
      />
      <NavigationButton
        labelText='Profile'
        iconName='user'
        isPressed={currentScreen === 'profile'}
        onPress={() => setCurrentScreen('profile')}
        disabled={!isAuthenticated}
        reverse
      />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const isSmallScreen = windowWidth < 450;

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    gap: Spacing.unit1o5 * 1.8,
    width: Spacing.unit5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: Spacing.unit * 5.35,
    marginBottom: isSmallScreen ? Spacing.unit1o10 : -Spacing.unit1o10 * 3,
  }
}); 