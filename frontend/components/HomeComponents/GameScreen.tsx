import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { GameListItem } from '@/store/gameReducer';
import GameList from '@/components/HomeComponents/GameList';
import { Text } from '@/components/Customs';
import SortBar from '@/components/SortButtons';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import { Colors, Spacing } from '@/constants/Constants';
import { logout } from '@/store/authReducer';
import { useDispatch } from 'react-redux';
import ToggleModeBtn from '@/components/ToggleModeBtn';
import LogoutButton from './LogoutButton';

interface GameScreenProps {
  sortMode: string;
  gameListRef: React.RefObject<FlatList<GameListItem>>;
}

export default function GameScreen({ sortMode, gameListRef }: GameScreenProps) {
  const { username } = useSelector((state: RootState) => state.authData.user);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.gameScreen}>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <LogoutButton/> 
      </View>
      <GameList
        sortMode={sortMode}
        ref={gameListRef}
        setIsPressed={setIsPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gameScreen: {
    flex: 1,
  },
  usernameText: {
    padding: 5,
    textAlign: 'left',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center',
  },
  logoutText: {
    alignSelf: 'center',
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.unit1o5,
    borderBottomColor: Colors.gray,
    borderBottomWidth: Spacing.border 
  },
});
