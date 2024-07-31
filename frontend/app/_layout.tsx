import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Platform, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Header from '../components/Header';
import { persistor, RootState, store } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { useSelector } from 'react-redux';

function Layout() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    } else if (isAuthenticated) {
      router.replace('/home/Profile');
    }
  }, [isAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stack>
        <Stack.Screen
          name='index'
          options={{ headerShown: false }}
        />
      </Stack>;
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
  tabBar: {
    height: Spacing.unit3o2,
    backgroundColor: Colors.blue,
    borderTopColor: Colors.yellowPrime,
    borderBottomColor: Colors.yellowPrime,
    borderTopWidth: Spacing.border,
    borderBottomWidth: Spacing.border,
  },
  tabBarText: {
    fontFamily: Fonts.monospace,
    fontSize: FontSizes.large,
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
