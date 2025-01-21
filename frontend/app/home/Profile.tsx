import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import { Text } from '../../components/Customs';
import ProfileDetails from '../../components/ProfileComponents/ProfileDetails';
import Header from '@/components/Header';

export default function Profile() {
  return (
    <View style={styles.profilePage}>
      <Header/>
    
      <ProfileDetails/>
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  profilePage: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.blue,
  },
  profileText: {
    marginVertical: Spacing.unit1o3,
    color: Colors.yellow,
    fontSize: FontSizes.large,
  }
});