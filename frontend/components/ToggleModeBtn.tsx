import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface ToggleModeBtnProps {
  iconName: string;
  isDisabled: boolean;
  pressFunction: (data: unknown) => void;
}

export default function ToggleModeBtn({iconName, isDisabled = false, pressFunction}: ToggleModeBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable 
      style={styles.editBtn}
      disabled={isDisabled}
      onPress={pressFunction}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <FontAwesome 
        size={isHovered ? FontSizes.large : FontSizes.medium}
        name={iconName}
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
    justifyContent: 'center',
    alignItems: 'center',
    width: FontSizes.large,
    height: FontSizes.large,
  },
});