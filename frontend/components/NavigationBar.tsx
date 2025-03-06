import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Colors, Spacing } from '@/constants/Constants';
import Header from '@/components/Header';
import NavigationButton from '@/components/HomeComponents/NavigationButton';
import AuthScreen from '@/components/AuthComponents/AuthScreen';  // We'll move the auth form here
import GameScreen from '@/components/HomeComponents/GameScreen';
import ProfileDetails from '@/components/ProfileComponents/ProfileDetails';
import SortBar from '@/components/HomeComponents/SortButtons';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import OpenCloseBar from '@/components/HomeComponents/OpenCloseBar';

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
        isPressed={currentScreen === 'games'}
        onPress={() => setCurrentScreen('games')}
        disabled={!isAuthenticated}
      />
      <NavigationButton
        labelText='Profile'
        iconName='child'
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
    justifyContent: 'flex-end',
    marginLeft: Spacing.unit * 5.35,
    marginBottom: isSmallScreen ? Spacing.unit1o10 : -Spacing.unit1o10 * 3,
  }
}); 