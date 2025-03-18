import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Customs';
import { Colors, FontSizes, Spacing } from '../constants/Constants';

type ErrorDisplayProps = {
  errorMessage: string;
}

export default function ErrorDisplay({ errorMessage }: ErrorDisplayProps) {
  return (
    <Text style={styles.errorText}>{errorMessage}</Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: Colors.red,
    fontSize: FontSizes.medium,
    textAlign: 'center',
  },
});
