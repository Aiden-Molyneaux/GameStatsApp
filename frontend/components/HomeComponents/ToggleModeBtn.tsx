import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface ToggleModeBtnProps {
  name: string;
  isDisabled: boolean;
  submitFunction: (data: unknown) => void;
}

export default function ToggleModeBtn({name, isDisabled = false, submitFunction}: ToggleModeBtnProps) {
  return (
    <Pressable 
      style={styles.editBtn}
      disabled={isDisabled}
      onPress={submitFunction}
    >
      <FontAwesome 
        size={FontSizes.medium} 
        name={name}
        color={(isDisabled) ? Colors.gray : Colors.yellow} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  editBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  },
});