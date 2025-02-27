import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { persistor, store } from '../../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import NavigationButton from '@/components/HomeComponents/NavigationButton';

export default function RootLayout() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          
          <Tabs screenOptions={tabBarScreenOptions}>
            <Tabs.Screen
              name='index'
              options={{
                tabBarLabel: '',
                tabBarLabelPosition: 'beside-icon',
                tabBarIcon: ({ focused }) => (
                  <View style={styles.hmm}>
                    <NavigationButton
                      labelText='Games'
                      iconName='home'
                      isPressed={focused}
                    />
                  </View>
                ),
              }}
            /> 
            <Tabs.Screen
              name='Profile'
              options={{
                tabBarLabel: '',
                tabBarLabelPosition: 'beside-icon',
                tabBarIcon: ({ focused }) => (
                  <View style={styles.hmm}>
                    <NavigationButton
                      labelText='Profile'
                      iconName='user'
                      isPressed={focused}
                    />
                  </View>

                ),
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
    justifyContent: 'center',
    backgroundColor: Colors.gray,
    // borderWidth: Spacing.borderThick,
    // borderColor: Colors.grayPrime,
  },
  tabBar: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    marginBottom: -Spacing.unit + -Spacing.unit1o10,
  },
  hmm: {
    flex: 1,
    width: Spacing.unit5,
    justifyContent: 'flex-end',
    marginLeft: 20
  },
  tabBarText: {
    fontFamily: Fonts.monospace,
    fontSize: FontSizes.large,
  }
});

const tabBarScreenOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.orange,
  tabBarInactiveTintColor: Colors.white,
  tabBarLabelStyle: { fontSize: FontSizes.medium },
  tabBarStyle: styles.tabBar,
};
