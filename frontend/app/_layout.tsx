import React from 'react';
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { persistor, store } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home'
            }}
          />
          <Tabs.Screen
            name="Settings"
            options={{
              title: 'Settings'
            }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
}