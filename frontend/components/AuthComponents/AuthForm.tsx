import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authReducer';
import { requestLoginUser, requestRegisterUser } from '../../api/authRequests';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '../../constants/Constants';
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
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  async function attemptAuth() {
    // Reset error states
    setAuthFail(false);
    setErrorMessage('');
    
    if (authMode === 'signIn') {
      try {
        const response = await requestLoginUser(username, password);

        if ('error' in response) {
          console.error(response.error);
          setAuthFail(true);
          setErrorMessage(response.error || 'Login failed. Please check your credentials.');
          return;
        }
        
        dispatch(loginSuccess({ token: response.token, user: response.user }));
        dispatch(changeUserAction({ user: response.user }));        
        
        // First fetch the data
        await fetchUserGames(dispatch);
        await fetchUserGamerTags(dispatch);        
      } catch(err) {
        console.error('Login exception:', err);
        setAuthFail(true);
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } else if (authMode === 'joinUp') {
      try {
        const response = await requestRegisterUser(username, password);
        if ('error' in response) {
          console.error('Registration error:', response.error);
          setAuthFail(true);
          setErrorMessage(response.error || 'Registration failed. Please try a different username.'); 
          return; 
        }
        
        dispatch(loginSuccess({ token: response.token, user: response.user }));
        dispatch(changeUserAction({ user: response.user }));   
      } catch(err) {
        console.error('Registration exception:', err);
        setAuthFail(true);
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  }

  useEffect(() => {
    setIsUsernameValid(username.length > 0 && !authFail);
    setIsPasswordValid(password.length > 0 && !authFail);
  }, [username, password, authFail]);

  const [isUsernameValid, setIsUsernameValid] = useState(username.length > 0 && !authFail);
  const [isPasswordValid, setIsPasswordValid] = useState(password.length > 0 && !authFail);

  function resetAuthFail() {
    setAuthFail(false);
    setErrorMessage('');
  }

  function handleUsernameChange(value: string) {
    setUsername(value);
    resetAuthFail();
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    resetAuthFail();
  }

  return (
    <View style={styles.authForm}>
      <View style={styles.authModeContainer}>
        <AuthModeButton type={'signIn'} authMode={authMode} setAuthMode={setAuthMode}/>
        <AuthModeButton type={'joinUp'} authMode={authMode} setAuthMode={setAuthMode}/>
      </View>

      <LabeledInput label='Username' placeholder='happyboy' value={username} onChangeText={handleUsernameChange} invalidInput={!isUsernameValid} />
      <LabeledInput label='Password' placeholder='∗∗∗∗∗∗∗∗' value={password} onChangeText={handlePasswordChange} secureTextEntry invalidInput={!isPasswordValid} />

      <View style={styles.errorSpacer}>
        { authFail && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      </View>

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
  errorSpacer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing.unit3o2,
  },
  errorContainer: {
    backgroundColor: '#fff0f0',
    borderWidth: 2,
    borderColor: Colors.red,
    borderRadius: Spacing.unit1o5,
  },
  errorText: {
    color: Colors.red,
    fontSize: FontSizes.mediumLess,
    textAlign: 'center',
  },
});
