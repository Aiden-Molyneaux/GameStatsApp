import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes } from '../../constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AuthSubmitButtonProps {
  attemptAuth: () => void;
}

export default function AuthSubmitButton({ attemptAuth }: AuthSubmitButtonProps) {
  return (
    <Pressable style={styles.authBtn} onPress={attemptAuth}>
      <FontAwesome 
        size={FontSizes.large} 
        name={'long-arrow-right'} 
        color={Colors.black}
      /> 
    </Pressable>
  );
}

const styles = StyleSheet.create({
  authBtn: {
    alignItems: 'flex-end',
  },
});
