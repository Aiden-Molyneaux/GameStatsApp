import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GameList } from '@/store/gameReducer';
import { User }  from '@/store/userReducer';
import { RootState } from '../../store/store';
import { changeNameAction, changeFavouriteGameAction } from '@/store/userReducer';
import { addGamerTagAction } from '@/store/gamerTagReducer';
import TextDropdown from './TextDropdown';
import GamerTagList from './GamerTagList';
import { Text, TextInput } from '@/components/Customs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ToggleModeBtn from '../ToggleModeBtn';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { requestUpdateUser } from '@/api/userRequests';
import { requestCreateGamerTag } from '@/api/gamerTagRequests';
import { GamerTag } from '../../../backend/models/gamerTagModel';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

export default function ProfileDetails() {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.userData);
  const gameList: GameList = useSelector((state: RootState) => state.gameData);
  const { gamerTags } = useSelector((state: RootState) => state.gamerTagData); 

  const [userData, setUserData] = useState({
    id: user.id,
    username: user.username,
    favouriteGame: user.favouriteGame,
  });

  const [mode, setMode] = useState(VIEW);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  useEffect(() => {
    setDisableAddBtn(gamerTags.some((gamerTag: GamerTag) => (gamerTag.tag === '')));
  }, [gamerTags]);

  useEffect(() => {
    setDisableSaveBtn((userData.username === '' || disableAddBtn));
  }, [userData, disableAddBtn]);

  async function handleUpdateUserDetails() {
    try {
      await requestUpdateUser(userData).then((response) => {
        if('error' in response) {
          console.error(response.error);
          return;
        }

        dispatch(changeNameAction(userData.username));
        dispatch(changeFavouriteGameAction(userData.favouriteGame));
      });

    } catch (err) {
      console.error(err);
    }
    
    // gamerTags.forEach((gamerTag : GamerTag) => {
    //   // if gamertag changed
    //   // should really send all gamertags in one payload and iterate through them on the backend
    //   if (true) {

    //   }
    //   updatedGamerTags
    // });

    // try {
    //   await requestUpdateGamerTags(updatedGamerTags).then((response) => {
    //     if('error' in response) {
    //       console.error(response.error);
    //       return;
    //     }

    //     dispatch(changeGamerTagAction(gamerTags));
    //   }
    // } catch(err) {

    // }

    setMode(VIEW);
  }

  function setModeEdit() {
    setMode(EDIT);
  }

  async function handlePlusPress() {
    try {
      await requestCreateGamerTag({ userId: user.user.id, tag: '', platform: 'Steam' }).then((response) => {
        if ('error' in response) { 
          console.error(response.error);
          // Handle error in UI
          return;
        }

        console.log({response});

        const defaultGamerTag: GamerTag = { id: response.gamerTag.id, userId: response.gamerTag.userId, tag: '', platform: 'Steam' };
        dispatch(addGamerTagAction({gamerTag: defaultGamerTag}));
      });
    } catch(err) {
      console.error(err);
    }

  }

  function handleTextInputChange(field: string, value: string, index: number | null = null) {
    if (field === 'gamerTag' && index !== null) {
      const newGamerTags: Array<GamerTag> = JSON.parse(JSON.stringify(gamerTags));
      newGamerTags[index].tag = value;

      setUserData({ ...userData });
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
          gamerTags={gamerTags}
          handleTextInputChange={handleTextInputChange}
          edit={false}
        />

        <Text>Favourite game: {<Text style={styles.labelText}>{user.favouriteGame}</Text>}</Text>
        <Text>Number of games: {<Text style={styles.labelText}>{gameList.games.length}</Text>}</Text>
      </View>
    ) : (
      <View style={styles.profileEditSection}>
        <ToggleModeBtn iconName={'save'} isDisabled={disableSaveBtn} pressFunction={handleUpdateUserDetails} />

        <Text style={styles.labelText}>Profile Name</Text>
        <TextInput
          placeholder='Username'
          style={styles.input}
          value={userData.username}
          onChangeText={(value: string) => handleTextInputChange('username', value)}
        />

        <Text style={styles.labelText}>Favourite Game</Text>
        <TextDropdown
          data={gameList.games.map(game => ({ label: game.name, value: game.name }))}
          value={userData.favouriteGame}
          onChange={(item: { label: string, value: string }) => {
            setUserData({ ...userData, favouriteGame: item.value });
          }}
        />

        <View style={styles.gamerTagEditContainer}>
          <Text style={styles.labelText}>Your Gamertags</Text>

          <GamerTagList
            gamerTags={gamerTags}
            handleTextInputChange={handleTextInputChange}
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
    padding: Spacing.unit1o2,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  gamerTagEditContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    zIndex: 1
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
    marginBottom: Spacing.unit1o5,
    color: Colors.yellow,
    fontSize: FontSizes.large
  },
  labelText: {
    color: Colors.yellow,
    fontSize: FontSizes.medium
  }
});