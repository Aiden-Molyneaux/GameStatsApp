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

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('Sign In');
  const [authFail, setAuthFail] = useState(false);
  const dispatch = useDispatch();

  async function attemptAuth() {
    if (authMode === 'Sign In') {
      try {
        await requestLoginUser(username, password).then((response) => {
          if ('error' in response) {
            console.error(response.error);
            setAuthFail(true); 
            return;
          }

          console.log(response.user);
          
          dispatch(loginSuccess({ token: response.token, user: response.user }));
          dispatch(changeUserAction({ user: response.user }));        
          getGames();
          getGamerTags();
        });
      } catch(err) {
        console.error(err);
      }

    } else if (authMode === 'Register') {
      try {
        await requestRegisterUser(username, password).then((response) => {
          if ('error' in response) {
            console.error(response.error);
            setAuthFail(true); 
            return; 
          }
  
          dispatch(loginSuccess({ token: response.token, user: response.user }));
        });
      } catch(err) {
        console.error(err);
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
    <View style={styles.authPage}>
      <View style={styles.authForm}>
        <Text style={styles.welcomeText}>{authMode === 'Sign In' ? 'Sign In' : 'Join In' }</Text>

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
  );
}

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.unit * 2,
    backgroundColor: Colors.blue,
  },
  authForm: {
    gap: Spacing.unit1o5,
    width: Spacing.unit10 - Spacing.unit,
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  welcomeText: {
    alignSelf: 'flex-start',
    paddingLeft: Spacing.unit1o5,
    fontSize: FontSizes.large,
    color: Colors.yellow
  },
  authBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authBtn: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    backgroundColor: Colors.yellowPrime,
    fontSize: FontSizes.mediumLess,
    textAlign: 'center',
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  modeBtn: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    backgroundColor: Colors.yellowPrime,
    fontSize: FontSizes.small,
    textAlign: 'center',
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  }
});