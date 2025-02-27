import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Platform, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/store';
import { GameListItem } from '@/store/gameReducer';
import GameList from '@/components/HomeComponents/GameList';
import { Text } from '@/components/Customs';
import SortBar from '@/components/HomeComponents/SortBar';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import Header from '@/components/Header';
import CustomButton from '@/components/HomeComponents/CustomButton';
import OpenCloseBar from '@/components/HomeComponents/OpenCloseBar';
import { logout } from '@/store/authReducer';
import { useDispatch } from 'react-redux';
import ToggleModeBtn from '@/components/ToggleModeBtn';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const { games } = useSelector((state: RootState) => state.gameData);
  const { username } = useSelector((state: RootState) => state.authData.user);
  const [gameCount, setGameCount] = useState(games.length);
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [sortMode, setSortMode] = useState('entered');
  const dispatch = useDispatch();

  const gameListRef = useRef<FlatList>(null);

  const [isPressed, setIsPressed] = useState(false);

  // keep track of if we have a game open for edit (or new)
  useEffect(() => {
    setDisableAddBtn(games.some((game: GameListItem) => (game.mode === 'NEW' || game.mode === 'EDIT')));
    setGameCount(games.length);
  }, [games]);

  function handleAddGame() {
    setTimeout(() => {
      gameListRef.current?.scrollToEnd({ animated: true }); // Scroll to the end when a new game is added
    }, 500);
  };

  return (
    <View style={styles.homePage}>
      <Header type='device'/>

      <View style={styles.screenContainer}>

        <View style={styles.screen}>
          {/* <LinearGradient
            colors={[Colors.screenGray, Colors.screenGray]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.pixelationOverlay}
          />
          <LinearGradient
            colors={[Colors.screenGray, Colors.appTitlePurple]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.pixelationOverlay, { opacity: 0.5 }]}
          /> */}
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{username}</Text>
            <View style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Logout</Text>
              <View style={styles.logoutIcon}>
                <ToggleModeBtn
                  type='editGame'
                  iconName='sign-out' 
                  isDisabled={false} 
                  pressFunction={() => dispatch(logout())} 
                />
              </View>
            </View>
          </View>
          <GameList
            games={games} 
            sortMode={sortMode}
            ref={gameListRef}
            setIsPressed={setIsPressed}
          />
        </View>

      </View>
      <View style={styles.buttons}>
        <SortBar currentSortMode={sortMode} setSortMode={setSortMode}/>
        <AddGameBtn
          isDisabled={disableAddBtn}
          onAddGame={handleAddGame}
          isPressed={isPressed}
          setIsPressed={setIsPressed}
        />
        <OpenCloseBar currentSortMode={sortMode} setSortMode={setSortMode}/>
      </View>
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.gray,
  },
  screenContainer: {
    flex: 1,
    width: '95%',
    borderWidth: Spacing.borderThick,
    borderColor: Colors.grayPrime,
    borderRadius: 15,
    marginBottom: Spacing.unit1o3,
    elevation: 8,
    position: 'relative',
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.screenGray,
    borderWidth: Spacing.border,
    borderColor: Colors.grayEdge,
    borderRadius: 9,
    overflow: 'hidden'
  },
  buttons: {
    height: Spacing.unit3o2,
    flexDirection: 'row',
    gap: Spacing.unit,
    width: '95%',
    marginBottom: Spacing.unit1o2 + Spacing.unit1o5
  },
  usernameText: {
    padding: 5,
    color: Colors.black,
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
    margin: 5
  },
  logoutText: {
    color: Colors.black,
    textAlign: 'left',
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.unit1o5,
    borderBottomColor: Colors.gray,
    borderBottomWidth: Spacing.border 
  },
  pixelationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
});
