import React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Platform } from "react-native";
import { Tabs } from 'expo-router';
import Header from '../components/Header';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { persistor, store, purgeStoredState } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes } from '@/constants/Constants';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Games from './index'
import Profile from './Profile'

const Tab = createBottomTabNavigator()

function CustomTabBar(props: any) {
  return (
    <View style={Platform.OS === "ios" ? styles.bottomTabBar : styles.topTabBar}>
      <BottomTabBar {...props} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <NavigationContainer> */}
          <SafeAreaView style={styles.container}>
            <Header/>
            <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}
              screenOptions={{
                tabBarActiveTintColor: Colors.yellow,
                tabBarInactiveTintColor: Colors.white,
                tabBarStyle: {
                  backgroundColor: Colors.blue,
                  borderTopColor: Colors.yellowPrime,
                  borderTopWidth: 2,
                  borderBottomColor: Colors.yellowPrime,
                  borderBottomWidth: 2,
                  height: 45,
                },
                tabBarLabelStyle: {
                  fontSize: FontSizes.medium,
                },
            }}>
              <Tab.Screen
                name="index"
                component={Games}
                options={{
                  title: 'Games',
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: 'Profile',
                  headerShown: false
                }}
              />
            </Tab.Navigator>
            <Button title='Reset Storage' onPress={purgeStoredState}/>
          </SafeAreaView>
        {/* </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabBar: {
    // display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
