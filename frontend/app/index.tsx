import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/authReducer'; // Adjust path as needed
import { RootState } from '@/store/store';
import { loginUser } from '@/auth';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  // console.log(isAuthenticated);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.replace('/home/Profile'); // Redirect to the 'auth' screen if authenticated
  //   }
  // }, [isAuthenticated]);

  async function attemptLogin() {
    await loginUser(username, password).then((result) => {
      console.log(result);
      if (result) {
        dispatch(loginSuccess({token: result.token, user: result.user}));
      }
    });
  }

  return (
    <View style={styles.authPage}>
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
      <Button title='Login' onPress={attemptLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.unit * 2,
    backgroundColor: Colors.blue,
  },
  input: {
    height: 40,
    borderColor: Colors.yellowPrime,
    borderWidth: 1,
    marginBottom: Spacing.unit,
    paddingHorizontal: Spacing.unit,
    backgroundColor: Colors.white,
    fontSize: FontSizes.medium,
  },
});