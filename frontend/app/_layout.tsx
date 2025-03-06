import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { persistor, store } from '../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, Spacing } from '@/constants/Constants';
import * as Font from 'expo-font';
import MainScreen from './MainScreen';  // We'll create this component

function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Jersey20-Regular': require('../assets/fonts/Jersey20-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);
    
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
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
  }
});
