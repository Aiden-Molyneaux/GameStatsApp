import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Stack, useRouter, Slot } from 'expo-router';
import { persistor, RootState, store } from '../store/store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import * as Font from 'expo-font';
import { validateToken } from '../api/authRequests';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authReducer';

function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'MonomaniacOne-Regular': require('../assets/fonts/MonomaniacOne-Regular.ttf'),
      });
      await Font.loadAsync({
        'Jersey20-Regular': require('../assets/fonts/Jersey20-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      if (!isAuthenticated) {
        router.replace('/');
      } else {
        validateAuth();
      }
    }
  }, [isAuthenticated, fontsLoaded]);

  async function validateAuth() {
    if (isAuthenticated) {
      try {
        const response = await validateToken();
        if ('error' in response) {
          dispatch(logout());
          router.replace('/');
        } else {
          router.replace('/home');
        }
      } catch (error) {
        dispatch(logout());
        router.replace('/');
      }
    }
  }

  if (!fontsLoaded) {
    return null; // Or a loading screen component
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='home' />
      </Stack>

      {/* <Pressable style={styles.resetBtn} onPress={() => purgeStoredState()}>
        <Text style={styles.resetText}>Reset Storage</Text>
      </Pressable> */}
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout/>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    borderWidth: Spacing.borderThick,
    borderColor: Colors.grayPrime,
  },
  resetBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: Spacing.unit3,
    height: Spacing.unit1o2,
    margin: Spacing.unit1o3,
    backgroundColor: Colors.black,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  resetText: {
    fontSize: FontSizes.small,
  },
});
