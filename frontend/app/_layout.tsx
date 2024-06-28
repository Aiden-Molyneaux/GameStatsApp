import React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from "react-native";
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { persistor, store, purgeStoredState } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <Tabs>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Games'
              }}
            />
            <Tabs.Screen
              name="Profile"
              options={{
                title: 'Profile',
              }}
            />
          </Tabs>
          <Button title='Reset Storage' onPress={purgeStoredState}/>
        </SafeAreaView>

      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background
  }
});
