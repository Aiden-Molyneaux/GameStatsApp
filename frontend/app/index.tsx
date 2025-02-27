import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/authReducer';
import { fetchGamesSuccess } from '../store/gameReducer';
import { requestLoginUser, requestRegisterUser } from '../api/authRequests';
import { requestFetchGamesByUser } from '../api/gameRequests';
import { Text, TextInput } from '@/components/Customs';
import { changeUserAction } from '@/store/userReducer';
import { requestFetchGamerTagsByUser } from '@/api/gamerTagRequests';
import { fetchGamerTagsSuccess } from '@/store/gamerTagReducer';
import SortBar from '@/components/HomeComponents/SortBar';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import Header from '@/components/Header';
import OpenCloseBar from '@/components/HomeComponents/OpenCloseBar';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('Sign In');
  const [authFail, setAuthFail] = useState(false);
  const dispatch = useDispatch();

  async function attemptAuth() {
    if (authMode === 'Sign In') {
      try {
        const response = await requestLoginUser(username, password);

        console.log('Auth Response:', response);
        if ('error' in response) {
          console.error(response.error);
          setAuthFail(true); 
          return;
        }
        
        dispatch(loginSuccess({ token: response.token, user: response.user }));
        dispatch(changeUserAction({ user: response.user }));        
        
        // First fetch the data
        await getGames();
        await getGamerTags();        
      } catch(err) {
        console.error(err);
        setAuthFail(true);
      }
    } else if (authMode === 'Register') {
      try {
        const response = await requestRegisterUser(username, password);
        if ('error' in response) {
          console.error(response.error);
          setAuthFail(true); 
          return; 
        }
        
        dispatch(loginSuccess({ token: response.token, user: response.user }));
      } catch(err) {
        console.error(err);
        setAuthFail(true);
      }
    }
  }

  async function getGames() {
    try {
      await requestFetchGamesByUser().then((response) => {
        if ('error' in response) {
          console.error(response.error); 
          return; 
        }
  
        dispatch(fetchGamesSuccess({games: response.games}));
      }); 
    } catch(err) {
      console.error(err);
    }
  }

  async function getGamerTags() {
    try {
      await requestFetchGamerTagsByUser().then((response) => {
        if ('error' in response) {
          console.error(response.error); 
          return; 
        }
  
        dispatch(fetchGamerTagsSuccess({gamerTags: response.gamerTags}));
      });
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <View style={styles.homePage}>
      <Header type='device'/>
      <View style={styles.speaker}></View>

      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.authPage}>
            <View style={styles.authForm}>
              <View style={styles.inScreenHeader}>
                <Header type='inScreen'/>
              </View>
              <Text style={styles.welcomeText}>{authMode === 'Sign In' ? 'Sign-In' : 'Join-Up' }</Text>

              { authFail
                ? <Text>Login failed</Text>
                : null
              }
              <TextInput
                style={styles.input}
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                // secureTextEntry
              />
              <View style={styles.authBtns}>
                <Pressable style={styles.modeBtn} onPress={() => setAuthMode(authMode === 'Sign In' ? 'Register' : 'Sign In')}>
                  <Text>or {authMode === 'Sign In' ? 'Join In' : 'Sign In'}</Text>
                </Pressable>
        
                <Pressable style={styles.authBtn} onPress={attemptAuth}>
                  <Text>-&gt;</Text>
                </Pressable>
              </View>

            </View>
          </View>
        </View>

      </View>
      <View style={styles.buttons}>
        <SortBar currentSortMode={''} setSortMode={() => {}}/>
        <AddGameBtn
          isDisabled={true}
          onAddGame={() => {}}
          isPressed={false}
          setIsPressed={() => {}}
        />
        <OpenCloseBar currentSortMode={''} setSortMode={() => {}}/>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: Spacing.unit * 2,
    backgroundColor: Colors.screenGray,
  },
  authForm: {
    gap: Spacing.unit1o5,
    width: Spacing.unit10 - Spacing.unit,
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
  },
  welcomeText: {
    alignSelf: 'flex-start',
    paddingLeft: Spacing.unit1o5,
    fontSize: FontSizes.large,
    color: Colors.black
  },
  authBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authBtn: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    backgroundColor: Colors.black,
    fontSize: FontSizes.mediumLess,
    textAlign: 'center',
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  modeBtn: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    backgroundColor: Colors.black,
    fontSize: FontSizes.small,
    textAlign: 'center',
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
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
    elevation: 8
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
    borderBottomColor: Colors.gray,
    borderBottomWidth: Spacing.border 
  },
  speaker: {
    position: 'absolute',
    top: Spacing.unit1o2,
    right: Spacing.unit1o2,
    height: Spacing.unit1o2,
    width: Spacing.unit1o2,
    backgroundColor: Colors.red,
    borderRadius: Spacing.unit1o2
  }
});
