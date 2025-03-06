import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Colors, Spacing } from '@/constants/Constants';
import Header from '@/components/Header';
import AuthScreen from '@/components/AuthComponents/AuthScreen';  // We'll move the auth form here
import GameScreen from '@/components/HomeComponents/GameScreen';
import ProfileDetails from '@/components/ProfileComponents/ProfileDetails';
import NavigationBar from '@/components/NavigationBar';
import FunctionButtons from '@/components/FunctionButtons';

export default function MainScreen() {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const [currentScreen, setCurrentScreen] = useState('games');
  const [sortMode, setSortMode] = useState('entered');

  const gameListRef = useRef<FlatList>(null);

  const renderScreen = () => {
    if (!isAuthenticated) {
      return <AuthScreen/>;
    }
    
    return currentScreen === 'games' 
      ? <GameScreen gameListRef={gameListRef} sortMode={sortMode} /> 
      : <ProfileDetails />;
  };

  return (
    <View style={styles.appScreen}>
      <Header />

      <View style={styles.innerScreenContainer}>
        <View style={styles.innerScreen}>
          { renderScreen() }
        </View>
      </View>

      <FunctionButtons gameListRef={gameListRef}/>

      <NavigationBar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
    </View>
  );
}

const styles = StyleSheet.create({
  appScreen: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.gray,
  },
  innerScreenContainer: {
    flex: 1,
    width: '95%',
    borderWidth: Spacing.borderThick,
    borderColor: Colors.grayPrime,
    borderRadius: 15,
    marginBottom: Spacing.unit1o3,
  },
  innerScreen: {
    flex: 1,
    backgroundColor: Colors.screenGray,
    borderWidth: Spacing.border,
    borderColor: Colors.grayEdge,
    borderRadius: 9
  }
}); 