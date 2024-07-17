import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import { Text } from '../components/Customs';
import ProfileDetails from '../components/ProfileComponents/ProfileDetails';

export default function Profile() {
  return (
    <View style={styles.profilePage}>
      <Text style={styles.profileText}>Your Profile</Text>
    
      <ProfileDetails/>
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  profilePage: {
    alignItems: 'center',
    height: '100%',
    paddingTop: isIOS ? 0 : Spacing.unit3o2,
    backgroundColor: Colors.blue,
  },
  profileText: {
    marginVertical: Spacing.unit1o3,
    color: Colors.yellow,
    fontSize: FontSizes.large,
  }
});