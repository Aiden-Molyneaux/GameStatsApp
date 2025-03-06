import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authReducer';
import { requestLoginUser, requestRegisterUser } from '../../api/authRequests';
import { Text } from '../Customs';
import { Spacing } from '../../constants/Constants';
import LabeledInput from '../HomeComponents/LabeledInput';
import { changeUserAction } from '@/store/userReducer';
import { fetchUserGames, fetchUserGamerTags } from '@/services/userDataService';
import AuthModeButton from './AuthModeButton';
import AuthSubmitButton from './AuthSubmitButton';

export default function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('signIn');
  const [authFail, setAuthFail] = useState(false);
  const dispatch = useDispatch();

  async function attemptAuth() {
    if (authMode === 'signIn') {
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
        await fetchUserGames(dispatch);
        await fetchUserGamerTags(dispatch);        
      } catch(err) {
        console.error(err);
        setAuthFail(true);
      }
    } else if (authMode === 'joinUp') {
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

  return (
    <View style={styles.authForm}>
      <View style={styles.authModeContainer}>
        <AuthModeButton type={'signIn'} authMode={authMode} setAuthMode={setAuthMode}/>
        <AuthModeButton type={'joinUp'} authMode={authMode} setAuthMode={setAuthMode}/>
      </View>

      { authFail ? <Text>Login failed</Text> : null }

      <LabeledInput label='Username' placeholder='happyboy' value={username} onChangeText={setUsername} />
      <LabeledInput label='Password' placeholder='∗∗∗∗∗∗∗∗' value={password} onChangeText={setPassword} secureTextEntry />

      <AuthSubmitButton authMode={authMode} attemptAuth={attemptAuth}/>
    </View>
  );
}

const styles = StyleSheet.create({
  authForm: {
    gap: Spacing.unit1o5,
    width: '85%',
  },
  authModeContainer: {
    padding: Spacing.unit
  },
});
