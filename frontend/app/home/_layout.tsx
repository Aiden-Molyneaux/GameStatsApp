import React from 'react';
import { StyleSheet, SafeAreaView, Platform, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { persistor, store } from '../../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabBarScreenOptions = (web: boolean) => {
  const style = web
    ? {
      position: 'absolute',
      top: 0,
      left: Spacing.screenWidth / 2,
      transform: 'translate(-50%, -0%)',
      width: Spacing.unit10,
      ...styles.tabBar,
    }
    : {
      paddingBottom: 0,
      ...styles.tabBar,
    };

  return {
    headerShown: false,
    tabBarActiveTintColor: Colors.orange,
    tabBarInactiveTintColor: Colors.white,
    tabBarLabelStyle: { fontSize: FontSizes.medium },
    tabBarStyle: style,
  };
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <Tabs screenOptions={TabBarScreenOptions(Platform.OS === 'web')}>
            <Tabs.Screen
              name='index'
              options={{
                tabBarLabel: 'Games',
                tabBarLabelStyle: styles.tabBarText,
                tabBarLabelPosition: 'beside-icon',
                tabBarIcon: ({ color }) => <FontAwesome size={FontSizes.large} name='home' color={color} />,
              }}
            />
            <Tabs.Screen
              name='Profile'
              options={{
                tabBarLabel: 'Profile',
                tabBarLabelStyle: styles.tabBarText,
                tabBarIcon: ({ color }) => <FontAwesome size={FontSizes.large} name='user' color={color} />,
              }}
            />
          </Tabs>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    zIndex: -1
  },
  tabBar: {
    height: Spacing.unit3o2,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderTopColor: Colors.yellowPrime,
    borderBottomColor: Colors.yellowPrime,
    borderTopWidth: Spacing.border,
    borderBottomWidth: Spacing.border,
    zIndex: -1
  },
  tabBarText: {
    fontFamily: Fonts.monospace,
    fontSize: FontSizes.large,
  }
});
