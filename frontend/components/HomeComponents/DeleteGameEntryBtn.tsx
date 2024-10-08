import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface ToggleCalendarBtnProps {
  clickFunction: (data: unknown) => void
}

export default function DeleteGameEntryBtn({clickFunction}: ToggleCalendarBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable 
      style={ styles.deleteBtn }
      onPress={clickFunction}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <FontAwesome
        name={'trash'}
        size={isHovered ? FontSizes.large : FontSizes.medium}
        color={Colors.yellow} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    left: Spacing.unit1o5,
    justifyContent: 'center',
    alignItems: 'center',
    width: FontSizes.large,
    height: FontSizes.large,
  }
});