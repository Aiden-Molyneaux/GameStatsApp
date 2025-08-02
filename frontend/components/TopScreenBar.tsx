import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Text } from '@/components/Customs';
import { Colors, Spacing } from '@/constants/Constants';
import LogoutButton from './LogoutButton';

export default function TopScreenBar() {
  const { username } = useSelector((state: RootState) => state.authData.user);

  return (
    <View style={styles.usernameContainer}>
      <Text style={styles.usernameText}>{username}</Text>
      <LogoutButton/> 
    </View>
  );
}

const styles = StyleSheet.create({
  usernameText: {
    padding: 5,
    textAlign: 'left',
  },
  usernameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.unit1o5,
    borderBottomColor: Colors.gray,
    borderBottomWidth: Spacing.border 
  },
});
