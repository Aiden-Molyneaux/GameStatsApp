import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { GameList } from '@/store/gameReducer';
import { RootState } from '../../store/store';
import { Text } from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface ProfileDetailsProps {
  setModeToEdit: () => void;
}

export default function ProfileDetails({ setModeToEdit }: ProfileDetailsProps) {
  const { user } = useSelector((state: RootState) => state.userData);
  const gameList: GameList = useSelector((state: RootState) => state.gameData);

  const [userData, setUserData] = useState({
    id: user.id,
    username: user.username,
    favouriteGame: user.favouriteGame,
  });

  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  useEffect(() => {
    setDisableSaveBtn((userData.username === '' || disableAddBtn));
  }, [userData, disableAddBtn]);

  return (
    <View style={styles.profileEditSection}>
      <ToggleModeBtn 
        type='edit'
        iconName='edit' 
        isDisabled={false} 
        pressFunction={setModeToEdit} 
      />

      <Text style={styles.usernameText}>{user.username}</Text>

      <Text>Favourite game: {<Text style={styles.labelText}>{user.favouriteGame}</Text>}</Text>
      <Text>Number of games: {<Text style={styles.labelText}>{gameList.games.length}</Text>}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileEditSection: {
    flex: 1,
  },
  gamerTagEditContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    zIndex: 1
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  addGamerTagBtn: {
    backgroundColor: Colors.black,
    paddingLeft: Spacing.unit1o5,
    paddingRight: Spacing.unit1o5,
    paddingTop: Spacing.unit1o10,
    paddingBottom: Spacing.unit1o10,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  usernameText: {
    marginBottom: Spacing.unit1o5,
    color: Colors.black,
    fontSize: FontSizes.large
  },
  labelText: {
    color: Colors.black,
    fontSize: FontSizes.medium
  }
});