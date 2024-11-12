import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, Dimensions  } from 'react-native';
import { Tabs } from 'expo-router';
import { persistor, store } from '../../store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import NavigationButton from '@/components/HomeComponents/NavigationButton';
import Header from '@/components/Header';

const TabBarScreenOptions = (web: boolean) => {
  const style = web
    ? {
      ...styles.tabBar,
    }
    : {

      paddingBottom: Spacing.unit1o10,
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
    borderWidth: Spacing.borderThick,
    borderColor: Colors.grayPrime,
  },
  tabBar: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: Spacing.unit1o5,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
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
