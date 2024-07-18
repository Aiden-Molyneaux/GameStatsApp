import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface ToggleCalendarBtnProps {
  pressFunction: (data: unknown) => void
}

export default function DelGamerTagBtn({pressFunction}: ToggleCalendarBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable 
      style={styles.delBtn}
      onPress={pressFunction}
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
  delBtn: {
    width: FontSizes.large,
    height: FontSizes.large,
    justifyContent: 'center',
    alignItems: 'center'
  }
});