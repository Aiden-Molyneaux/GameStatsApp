import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../store/authReducer';
import { requestLoginUser, requestRegisterUser } from '../../api/authRequests';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '../../constants/Constants';
import LabeledInput from '../HomeComponents/LabeledInput';
import { changeUserAction } from '@/store/userReducer';
import { fetchUserGames, fetchUserGamerTags } from '@/services/userDataService';
import AuthModeButton from './AuthModeButton';
import AuthSubmitButton from './AuthSubmitButton';
import { User } from '../../../backend/models/userModel';
import { purgeStoredState } from '../../store/store';
import ErrorDisplay from '../ErrorDisplay';

export default function AuthForm() {
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('signIn');
  const [authFail, setAuthFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    setIsUsernameValid(username.length > 0 && !authFail);
    setIsPasswordValid(password.length > 0 && !authFail);
  }, [username, password, authFail]);

  // Handle successful authentication
  function handleAuthSuccess(response: { token: string; user: User }) {
    dispatch(loginSuccess({ token: response.token, user: response.user }));
    dispatch(changeUserAction({ user: response.user }));
  }
  
  // Handle authentication failures
  function handleAuthError(errorMessage: string) {
    console.error(errorMessage);
    setAuthFail(true);
    setErrorMessage(errorMessage);
  }

  async function attemptAuth() {
    try {
      // Clear any existing store data before authentication
      purgeStoredState();
      
      const authRequest = authMode === 'signIn' ? 
        requestLoginUser(username, password) : 
        requestRegisterUser(username, password);
      
      const response = await authRequest;
      
      if ('error' in response) {
        handleAuthError(response.error.message);
        return;
      }
      
      handleAuthSuccess(response);
      
      if (authMode === 'signIn') {
        await fetchUserGames(dispatch);
        await fetchUserGamerTags(dispatch);
      }
    } catch(err) {
      console.error('Auth Request ERROR:', err);
      handleAuthError('An unexpected error occurred. Please try again later.');
    }
  }

  function resetAuthFail() {
    setAuthFail(false);
    setErrorMessage('');
  }

  function handleInputChange(setter: (value: string) => void) {
    return (value: string) => {
      setter(value);
      resetAuthFail();
    };
  }

  return (
    <View style={styles.authForm}>
      <View style={styles.authModeContainer}>
        <AuthModeButton type={'signIn'} authMode={authMode} setAuthMode={setAuthMode}/>
        <AuthModeButton type={'joinUp'} authMode={authMode} setAuthMode={setAuthMode}/>
      </View>

      <LabeledInput 
        label='Username' 
        placeholder='happyboy' 
        value={username} 
        onChangeText={handleInputChange(setUsername)} 
        invalidInput={!isUsernameValid} 
      />
      <LabeledInput
        label='Password' 
        placeholder='••••••••' 
        value={password} 
        onChangeText={handleInputChange(setPassword)} 
        secureTextEntry 
        invalidInput={!isPasswordValid} 
      />

      <View style={styles.errorSpacer}>
        { authFail && (
          <ErrorDisplay errorMessage={errorMessage} />
        )}
      </View>

      <AuthSubmitButton authMode={authMode} attemptAuth={attemptAuth} isDisabled={!isUsernameValid || !isPasswordValid || authFail} />
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
    height: Spacing.unit,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
