import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface ToggleCalendarBtnProps {
  styleType: string,
  iconName: string,
  pressFunction: (data: unknown) => void
}

export default function ToggleCalendarBtn({styleType, iconName, pressFunction}: ToggleCalendarBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable 
      style={styleType === 'calendarBtn' ? styles.openBtn : styles.closeBtn }
      onPress={pressFunction}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <FontAwesome
        name={iconName}
        size={isHovered ? FontSizes.large : FontSizes.medium}
        color={Colors.yellow} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  openBtn: {
    alignItems: 'center',
    padding: Spacing.unit1o5
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  }
});