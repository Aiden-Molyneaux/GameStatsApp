import React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, Platform } from "react-native";
import { Tabs } from 'expo-router';
import Header from '../components/Header';
import { persistor, store, purgeStoredState } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          
          <Header/>

          <Tabs screenOptions={TabBarScreenOptions(Platform.OS == "web")}>

            <Tabs.Screen
              name="index"
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />
              }}
            />

            <Tabs.Screen
              name="Profile"
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({color}) => <FontAwesome size={28} name="user" color={color} />
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
    backgroundColor: Colors.blue
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: Colors.blue,
    borderTopColor: Colors.yellowPrime,
    borderBottomColor: Colors.yellowPrime,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    height: 45,
    position: 'absolute',
  },
});

const TabBarScreenOptions = (web: boolean) => {
  
  let style;
  (web) ? style = {...styles.tabBar, top: 0} : style = {...styles.tabBar, bottom: 0}

  return {
    headerShown: false,
    tabBarActiveTintColor: Colors.yellow,
    tabBarInactiveTintColor: Colors.white,
    tabBarLabelStyle: {fontSize: FontSizes.medium},
    tabBarStyle: style,
}}