import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import { Colors, Spacing } from '@/constants/Constants';
import ProfileList from '@/components/ProfileComponents/ProfileList';

export default function Profile() {

  return (
    <View style={styles.gamePage}>
      <ProfileList/>
    </View>
  );
}

const isIOS = Platform.OS === 'ios';

const styles = StyleSheet.create({
  gamePage: {
    flexGrow: 1,
    height: '100%',
    paddingTop: isIOS ? 0 : Spacing.unit2,
    backgroundColor: Colors.blue,
  }
});