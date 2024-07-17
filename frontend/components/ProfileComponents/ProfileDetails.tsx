import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GameList } from '@/store/gameListReducer';
import { User, GamerTag, changeGamerTagAction }  from '@/store/userReducer';
import { RootState } from '../../store/store';
import { changeNameAction, changefavouriteGameAction, addGamerTagAction } from '@/store/userReducer';
import TextDropdown from './TextDropdown';
import GamerTagList from './GamerTagList';
import { Text, TextInput } from '@/components/Customs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ToggleModeBtn from '../ToggleModeBtn';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

export default function ProfileDetails() {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.userData);
  const gameList: GameList = useSelector((state: RootState) => state.gameListData);

  const [userData, setUserData] = useState({
    id: user.id,
    username: user.username,
    favouriteGame: user.favouriteGame,
    gamerTags: user.gamerTags,
  });

  const [mode, setMode] = useState(VIEW);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);
  const [gamerTagCount, setGamerTagCount] = useState(userData.gamerTags.length);

  useEffect(() => {
    setDisableAddBtn(userData.gamerTags.some((gamerTag: GamerTag) => (gamerTag.gamerTag === '')));
    setGamerTagCount(userData.gamerTags.length);
  }, [userData.gamerTags]);

  useEffect(() => {
    setDisableSaveBtn((userData.username === '' || disableAddBtn));
  }, [userData, disableAddBtn]);

  function saveUserEntry() {
    dispatch(changeNameAction(userData.username));
    dispatch(changefavouriteGameAction(userData.favouriteGame));
    dispatch(changeGamerTagAction(userData.gamerTags));
    setMode(VIEW);
  }

  function setModeEdit() {
    setMode(EDIT);
  }

  function handlePlusPress() {
    const defaultGamerTag: GamerTag = { id: gamerTagCount, gamerTag: '', platform: 'Steam' };
    const gamerTagsCopy = JSON.parse(JSON.stringify(userData.gamerTags));
    gamerTagsCopy.push(defaultGamerTag);

    setUserData({ ...userData, gamerTags: gamerTagsCopy });
    dispatch(addGamerTagAction(defaultGamerTag));
  }

  function handleTextInputChange(field: string, value: string, index: number | null = null) {
    if (field === 'gamerTag' && index !== null) {
      const newGamerTags: Array<GamerTag> = JSON.parse(JSON.stringify(userData.gamerTags));
      newGamerTags[index].gamerTag = value;

      setUserData({ ...userData, gamerTags: newGamerTags });
    } else {
      setUserData({ ...userData, [field]: value });
    }
  }

  return (
    (mode === VIEW) ? (
      <View style={styles.profileEditSection}>
        <ToggleModeBtn iconName={'edit'} isDisabled={false} pressFunction={setModeEdit} />

        <Text style={styles.usernameText}>{user.username}</Text>
        <Text style={{ fontSize: FontSizes.mediumLess }}>Also known as...</Text>

        <GamerTagList
          gamerTags={user.gamerTags}
          handleTextInputChange={handleTextInputChange}
          userData={userData}
          setUserData={setUserData}
          edit={false}
        />

        <Text>Favourite game: {<Text style={{ color: Colors.yellow }}>{user.favouriteGame}</Text>}</Text>
        <Text>Number of games: {<Text style={{ color: Colors.yellow }}>{gameList.games.length}</Text>}</Text>
      </View>
    ) : (
      <View style={styles.profileEditSection}>
        <ToggleModeBtn iconName={'save'} isDisabled={disableSaveBtn} pressFunction={saveUserEntry} />

        <TextInput
          placeholder='Username'
          style={styles.input}
          value={userData.username}
          onChangeText={(value: string) => handleTextInputChange('username', value)}
        />

        <Text style={styles.labelText}>favourite game:</Text>
        <TextDropdown
          data={gameList.games.map(game => ({ label: game.name, value: game.name }))}
          value={userData.favouriteGame}
          onChange={(item: { label: string, value: string }) => {
            setUserData({ ...userData, favouriteGame: item.value });
          }}
        />

        <View style={styles.gamerTagEditContainer}>
          <Text style={styles.labelText}>Your Gamertags:</Text>

          <GamerTagList
            gamerTags={userData.gamerTags}
            handleTextInputChange={handleTextInputChange}
            userData={userData}
            setUserData={setUserData}
            edit={true}
          />
        </View>

        <Pressable style={styles.addGamerTagBtn} onPress={handlePlusPress} disabled={disableAddBtn}>
          <FontAwesome size={Spacing.unit1o2} name='plus' color={Colors.white} />
        </Pressable>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  profileEditSection: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o2,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5
  },
  gamerTagEditContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  addGamerTagBtn: {
    backgroundColor: Colors.yellowPrime,
    paddingLeft: Spacing.unit1o5,
    paddingRight: Spacing.unit1o5,
    paddingTop: Spacing.unit1o10,
    paddingBottom: Spacing.unit1o10,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  usernameText: {
    color: Colors.yellow,
    fontSize: FontSizes.large + 5
  },
  labelText: {
    color: Colors.yellow,
    fontSize: FontSizes.mediumLess
  }
});