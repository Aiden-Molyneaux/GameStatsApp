import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextInput} from '@/components/Customs';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { GameList, Game } from '@/store/gameListReducer';
import { User, GamerTag, changeGamerTagAction }  from '@/store/userReducer';
import { RootState } from '../../store/store';
import { changeNameAction, changeFavoriteGameAction, addGamerTagAction } from '@/store/userReducer';
import TextDropdown from './TextDropdown';
import GamerTagForm from './GamertagForm';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

export default function ProfileEntry() {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.userData);
  const gameList: GameList = useSelector((state: RootState) => state.gameListData);

  const [userData, setUserData] = useState({
    id: user.id,
    username: user.username,
    favoriteGame: user.favoriteGame,
    gamerTags: user.gamerTags,
  });

  const [mode, setMode] = useState(VIEW);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);
  const [gamerTagCount, setGamerTagCount] = useState(userData.gamerTags.length);

  useEffect(() => {
    setDisableAddBtn(userData.gamerTags.some((gamerTag: GamerTag) => (gamerTag.gamerTag === '')));
  }, [userData.gamerTags]);

  useEffect(() => {
    setDisableSaveBtn((userData.username === '' || disableAddBtn));
  }, [userData, disableAddBtn]);

  useEffect(() => {
    setGamerTagCount(userData.gamerTags.length);
  }, [userData.gamerTags]);

  function saveUserEntry() {
    dispatch(changeNameAction(userData.username));
    dispatch(changeFavoriteGameAction(userData.favoriteGame));
    dispatch(changeGamerTagAction(userData.gamerTags));
    setMode(VIEW);
  }

  function setModeEdit() {
    setMode(EDIT);
  }

  function handlePlusPress() {
    const defaultGamerTag: GamerTag = {id: gamerTagCount, gamerTag: '', platform: 'Steam'};
    const gamerTagsCopy = JSON.parse(JSON.stringify(userData.gamerTags));
    gamerTagsCopy.push(defaultGamerTag);

    setUserData({...userData, gamerTags: gamerTagsCopy});
    dispatch(addGamerTagAction(defaultGamerTag));

  }

  function handleTextInputChange(field: string, value: string, index: number | null = null) {
    if (field === 'gamerTag' && index !== null) {
      const newGamerTags: Array<GamerTag> = JSON.parse(JSON.stringify(userData.gamerTags));
      newGamerTags[index].gamerTag = value;

      setUserData({...userData, gamerTags: newGamerTags });
    } else {
      setUserData({...userData, [field]: value });
    }
  }

  return (
    (mode === VIEW) ? (
      <View style={styles.profileEditSection}>
        <Pressable 
          style={styles.editBtn} 
          onPress={setModeEdit}
        >
          <FontAwesome size={Spacing.unit1o2} name='edit' color={Colors.yellow} />
        </Pressable>

        <Text style={styles.usernameText}>{user.username}</Text>
        <Text style={{fontSize: FontSizes.mediumLess}}>Also known as...</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={user.gamerTags}
          renderItem={({ item, index }) => (
            <GamerTagForm
              item={item}
              index={index}
              edit={false}
              handleTextInputChange={handleTextInputChange}
              userData={userData}
              setUserData={setUserData}
            />
          )}
          keyExtractor={(gamerTag: GamerTag) => String(gamerTag.id)}
        />

        <Text>Favorite game: {<Text style={{color: Colors.yellow}}>{user.favoriteGame}</Text>}</Text>
        <Text>Number of games: {<Text style={{color: Colors.yellow}}>{gameList.games.length}</Text>}</Text>
      </View>
    ) : (
      <View style={styles.profileEditSection}>
        <Pressable style={styles.editBtn} onPress={saveUserEntry} disabled={disableSaveBtn}>
          <FontAwesome size={Spacing.unit1o2} name='save' color={(disableSaveBtn) ? Colors.gray : Colors.yellow} />
        </Pressable>

        <TextInput
          placeholder='Username'
          placeholderTextColor={Colors.gray}
          style={styles.input}
          value={userData.username} 
          onChangeText={(value: string) => handleTextInputChange('username', value)}
        />

        <Text style={styles.labelText}>Favorite game:</Text>
        <TextDropdown
          data={gameList.games.map(game => ({label: game.name, value: game.name}))}
          value={userData.favoriteGame}
          onChange={(item: {label: string, value: string}) => {
            setUserData({ ...userData, favoriteGame: item.value });
          }}
        />

        <View style={styles.gamerTagEditContainer}>
          <Text style={styles.labelText}>Your Gamertags:</Text>

          <FlatList
            contentContainerStyle={styles.flatlistRowContainer}
            showsVerticalScrollIndicator={false}
            data={userData.gamerTags}
            renderItem={({ item, index }) => (
              <GamerTagForm
                item={item}
                index={index}
                edit={true}
                handleTextInputChange={handleTextInputChange}
                userData={userData}
                setUserData={setUserData}
              />
            )}
            keyExtractor={(gamerTag: GamerTag) => String(gamerTag.id)}
          />
        </View>

        <Pressable style={styles.addBtn} onPress={handlePlusPress} disabled={disableAddBtn}>
          <FontAwesome size={Spacing.unit1o2} name='plus' color={(disableAddBtn) ? Colors.gray : Colors.white} />
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
  flatlistRowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    color: Colors.white,
  },
  addBtn: {
    backgroundColor: Colors.yellowPrime,
    paddingLeft: Spacing.unit1o5,
    paddingRight: Spacing.unit1o5,
    paddingTop: Spacing.unit1o10,
    paddingBottom: Spacing.unit1o10,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  gamerTagEntry: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  usernameText: {
    color: Colors.yellow,
    fontSize: FontSizes.large + 5
  },
  labelText: {
    color: Colors.yellow,
    fontSize: FontSizes.mediumLess
  },
  editBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  },
  icon: {
    marginLeft: Spacing.unit1o2
  }
});