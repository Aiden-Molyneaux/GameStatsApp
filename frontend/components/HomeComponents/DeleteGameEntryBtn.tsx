import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface DeleteGameEntryBtnProps {
  pressFunction: (data: unknown) => void
}

export default function DeleteGameEntryBtn({pressFunction}: DeleteGameEntryBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable 
      style={ styles.deleteBtn }
      onPress={pressFunction}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <FontAwesome
        name={'trash'}
        size={isHovered ? FontSizes.large : FontSizes.medium}
        color={Colors.red} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: FontSizes.large,
    height: FontSizes.large,
    zIndex: 0
  }
});