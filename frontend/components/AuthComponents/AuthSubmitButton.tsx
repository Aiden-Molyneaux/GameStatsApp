import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '../../constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AuthSubmitButtonProps {
  authMode: string;
  attemptAuth: () => void;
}

export default function AuthSubmitButton({ authMode, attemptAuth }: AuthSubmitButtonProps) {
  return (
    <Pressable style={styles.authBtn} onPress={attemptAuth}>
      <Text>{authMode === 'signIn' ? 'Sign In' : 'Join Up'}</Text>
      <FontAwesome 
        size={FontSizes.medium} 
        name={'arrow-right'} 
        color={Colors.black}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  authBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.unit1o5,
    padding: Spacing.unit1o5
  },
});