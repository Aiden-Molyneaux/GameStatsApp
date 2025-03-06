import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../Customs';
import { FontSizes, Spacing } from '../../constants/Constants';
import AuthForm from './AuthForm';

export default function AuthScreen() {
  return (
    <View style={styles.authPage}>
      <Text style={styles.welcomeText}>Welcome ...</Text>
      <AuthForm />
    </View>
  );
}

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: FontSizes.larger,
    marginBottom: Spacing.unit,
  },
});
