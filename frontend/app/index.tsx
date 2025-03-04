import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
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
import NavigationButton from '@/components/HomeComponents/NavigationButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
      <Header/>

      <View style={styles.screenContainer}>
        <View style={styles.screen}>
          <View style={styles.authPage}>
            <View style={styles.authForm}>
              <View style={styles.authHeader}>
                <Pressable style={styles.modeBtn} onPress={() => setAuthMode('Sign In')}>
                  <FontAwesome 
                    size={FontSizes.large} 
                    name={'caret-right'} 
                    color={authMode === 'Sign In' ? Colors.black : Colors.screenGray}
                  /> 
                  <Text style={styles.modeBtnText}>Sign-In</Text>
                </Pressable>
                <Pressable style={styles.modeBtn} onPress={() => setAuthMode('Register')}>
                  <FontAwesome 
                    size={FontSizes.large} 
                    name={'caret-right'} 
                    color={authMode === 'Register' ? Colors.black : Colors.screenGray}
                  /> 
                  <Text style={styles.modeBtnText}>Join-Up</Text>
                </Pressable>
              </View>

              { authFail
                ? <Text>Login failed</Text>
                : null
              }
              <View style={styles.authInputContainer}>
                <Text style={styles.inputLabel}>Username:</Text>
                <TextInput
                  style={styles.input}
                  placeholder='happyboy'
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View style={styles.authInputContainer}>
                <Text style={styles.inputLabel}>Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View style={styles.authBtns}>

        
                <Pressable style={styles.authBtn} onPress={attemptAuth}>
                  <FontAwesome 
                    size={FontSizes.large} 
                    name={'long-arrow-right'} 
                    color={Colors.black}
                  /> 
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
        <View style={styles.btnContainer}>
          <NavigationButton
            labelText='Games'
            iconName='home'
            isPressed={false}
          />
          <NavigationButton
            labelText='Profile'
            iconName='user'
            isPressed={false}
          />
      </View>
    </View>

  );
}

const windowWidth = Dimensions.get('window').width;
const isSmallScreen = windowWidth < 450;

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // padding: Spacing.unit * 2,
    backgroundColor: Colors.screenGray,
  },
  authForm: {
    gap: Spacing.unit1o5,
    width: Spacing.unit10 - Spacing.unit,
  },
  authInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.unit1o5,
    marginLeft: Spacing.unit1o10 *3,
  },
  inputLabel: {
    color: Colors.black,
    fontSize: FontSizes.medium,
  },
  input: {
    flex: 1,
    margin: Spacing.unit1o10,
    marginLeft: 0,
    padding: Spacing.unit1o10,

  },
  welcomeText: {
    alignSelf: 'flex-start',
    paddingLeft: Spacing.unit1o5,
    fontSize: FontSizes.large,
    color: Colors.black
  },
  orText: {
    color: Colors.black,
    textAlign: 'left',
  },
  authBtns: {
    justifyContent: 'flex-end',
    marginBottom: Spacing.unit1o5
  },
  authHeader: {
    justifyContent: 'center',
    gap: Spacing.unit1o5
  },
  authBtn: {
    alignItems: 'flex-end',
  },

  modeBtn: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
  },
  modeBtnText: {
    marginLeft: Spacing.unit1o10,
    color: Colors.black,
    fontSize: FontSizes.large
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
    marginBottom: Spacing.unit1o3
  },
  usernameText: {
    padding: 5,
    color: Colors.black,
    textAlign: 'left',
    borderBottomColor: Colors.gray,
    borderBottomWidth: Spacing.border 
  },
  btnContainer: {
    flexDirection: 'row',
    gap: Spacing.unit1o5 * 1.8,
    width: Spacing.unit5,
    justifyContent: 'flex-end',
    marginLeft: Spacing.unit * 5.35,
    marginBottom:isSmallScreen ? Spacing.unit1o10: -Spacing.unit1o10 * 3,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.unit1o5,
  },

});
