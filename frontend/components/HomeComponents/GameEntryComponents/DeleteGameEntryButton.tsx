import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface DeleteGameEntryButtonProps {
  pressFunction: (data: unknown) => void
}

export default function DeleteGameEntryButton({pressFunction}: DeleteGameEntryButtonProps) {
  return (
    <Pressable 
      style={ styles.deleteBtn }
      onPress={pressFunction}
    >
      <FontAwesome
        name={'trash'}
        size={FontSizes.medium}
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