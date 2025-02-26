import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface DeleteGamerTagBtnProps {
  pressFunction: (data: unknown) => void
}

export default function DeleteGamerTagBtn({pressFunction}: DeleteGamerTagBtnProps) {
  return (
    <Pressable 
      style={styles.deleteBtn}
      onPress={pressFunction}
    >
      <FontAwesome
        name={'trash'}
        size={FontSizes.medium}
        color={Colors.black} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    width: FontSizes.large,
    height: FontSizes.large,
    justifyContent: 'center',
    alignItems: 'center'
  }
});