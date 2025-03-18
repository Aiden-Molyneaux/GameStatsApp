import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '../../constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AuthSubmitButtonProps {
  authMode: string;
  attemptAuth: () => void;
  isDisabled: boolean;
}

export default function AuthSubmitButton({ authMode, attemptAuth, isDisabled }: AuthSubmitButtonProps) {
  return (
    <Pressable style={styles.authBtn} onPress={attemptAuth} disabled={isDisabled}>
      <Text style={{...styles.authBtnText, color: isDisabled ? Colors.grayPrime : Colors.black}  }>{authMode === 'signIn' ? 'Sign in' : 'Join up'}</Text>
      <FontAwesome 
        size={FontSizes.medium} 
        name={'arrow-right'} 
        color={isDisabled ? Colors.grayPrime : Colors.black}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  authBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: Spacing.unit1o5,
    padding: Spacing.unit1o5
  },
  authBtnText: {
    fontSize: FontSizes.large,
  },
});