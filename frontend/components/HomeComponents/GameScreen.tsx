import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { GameListItem } from '@/store/gameReducer';
import GameList from '@/components/HomeComponents/GameList';
import { Text } from '@/components/Customs';
import { Colors, Spacing } from '@/constants/Constants';
import LogoutButton from './LogoutButton';

interface GameScreenProps {
  gameListRef: React.RefObject<FlatList<GameListItem>>;
}

export default function GameScreen({ gameListRef }: GameScreenProps) {
  const { username } = useSelector((state: RootState) => state.authData.user);

  return (
    <View style={styles.gameScreen}>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <LogoutButton/> 
      </View>
      <GameList
        ref={gameListRef}
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
