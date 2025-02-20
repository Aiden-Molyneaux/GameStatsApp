import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { persistor, RootState, store } from '../store/store';
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
