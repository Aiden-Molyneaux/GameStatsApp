import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '../../constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AuthModeButtonProps {
  type: string;
  authMode: string;
  setAuthMode: (mode: string) => void;
}

export default function AuthModeButton({ type, authMode, setAuthMode }: AuthModeButtonProps) {
  const label = type === 'joinUp' ? 'Join up' : 'Sign in';

  return (
    <Pressable style={styles.modeBtn} onPress={() => setAuthMode(type)}>
      <FontAwesome
        size={FontSizes.large} 
        name={'caret-right'} 
        color={authMode === type ? Colors.black : Colors.screenGray}
      /> 
      <Text style={styles.modeBtnText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modeBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: Spacing.unit1o10
  },
  modeBtnText: {
    fontSize: FontSizes.large
  },
});
