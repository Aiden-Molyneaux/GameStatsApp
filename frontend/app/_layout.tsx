import React from 'react';
import { StyleSheet, Button, SafeAreaView, Platform, Dimensions } from "react-native";
import { Tabs } from 'expo-router';
import Header from '../components/Header';
import { persistor, store, purgeStoredState } from '../store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Fonts } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const TabBarScreenOptions = (web: boolean) => {
  
  let style = (web) 
    ? {
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -0%)',
      width: 300,
      ...styles.tabBar,
    } 
    : {...styles.tabBar, bottom: 0}

  return {
    headerShown: false,
    tabBarActiveTintColor: Colors.yellow,
    tabBarInactiveTintColor: Colors.white,
    tabBarLabelStyle: {fontSize: FontSizes.medium},
    tabBarStyle: style,
}}

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
                tabBarLabelStyle: styles.tabBarText,
                tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />
              }}
            />

            <Tabs.Screen
              name="Profile"
              options={{
                tabBarLabel: "Profile",
                tabBarLabelStyle: styles.tabBarText,
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
    position: 'absolute',

    // transform: 'translate(-50%, -0%)',

    height: 45,
    backgroundColor: Colors.blue,
    fontSize: FontSizes.mediumTwo,
    borderTopColor: Colors.yellowPrime,
    borderBottomColor: Colors.yellowPrime,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  tabBarText: {
    fontFamily: Fonts.monospace,
    fontSize: FontSizes.medium
  }
});