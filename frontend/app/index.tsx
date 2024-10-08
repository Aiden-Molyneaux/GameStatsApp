import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/authReducer';
import { fetchGamesSuccess } from '../store/gameReducer';
import { loginUser, registerUser } from '../api/authRequests';
import { requestFetchGamesByUser } from '../api/gameRequests';
import { Text, TextInput } from '@/components/Customs';
import { store } from '@/store/store';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('Login');
  const [authFail, setAuthFail] = useState(false);
  const dispatch = useDispatch();

  async function attemptAuth() {
    if (authMode === 'Login') {
      await loginUser(username, password).then((userData) => {
        if (!userData) { 
          setAuthFail(true); 
          return; 
        }

        console.log({userData});
        
        dispatch(loginSuccess({token: userData.token, user: userData.user}));        
        getGames();
      });
    } else if (authMode === 'Register') {
      await registerUser(username, password).then((userData) => {
        if (!userData) { 
          setAuthFail(true); 
          return; 
        }

        dispatch(loginSuccess({token: userData.token, user: userData.user}));
      });
    }
  }

  async function getGames() {
    await requestFetchGamesByUser().then((result) => {
      if (!result) { return; }

      dispatch(fetchGamesSuccess({games: result.games}));
      console.log(store.getState());
    }); 
  }

  return (
    <View style={styles.authPage}>
      <View style={styles.authForm}>
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
        <Pressable style={styles.authBtn} onPress={attemptAuth}>
          <Text>{authMode === 'Login' ? 'Login' : 'Register'}</Text>
        </Pressable>

        <Pressable style={styles.modeBtn} onPress={() => setAuthMode(authMode === 'Login' ? 'Register' : 'Login')}>
          <Text>or {authMode === 'Login' ? 'Register' : 'Login'}</Text>
        </Pressable>
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
    fontSize: FontSizes.mediumLess,
    textAlign: 'center',
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  }
});