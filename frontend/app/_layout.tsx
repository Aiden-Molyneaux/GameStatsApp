import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Header from '../components/Header';
import { Text } from '@/components/Customs';
import { persistor, RootState, store, purgeStoredState } from '../store/store';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

function Layout() {
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    } else if (isAuthenticated) {
      router.replace('/home');
    }
  }, [isAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='home'
          options={{ headerShown: false }}
        />
      </Stack>

      <Pressable style={styles.resetBtn} onPress={() => purgeStoredState()}>
        <Text style={styles.resetText}>Reset Storage</Text>
      </Pressable>
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
    backgroundColor: Colors.blue,
  },
  resetBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: Spacing.unit * 3,
    height: Spacing.unit1o2,
    margin: Spacing.unit1o3,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  resetText: {
    fontSize: FontSizes.small,
  },
});
