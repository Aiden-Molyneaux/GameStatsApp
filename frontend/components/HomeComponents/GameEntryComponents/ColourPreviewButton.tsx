import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing } from '@/constants/Constants';

interface ColourInputsProps {
  colour: string,
  showColourPicker: boolean,
  setShowColourPicker: (showColourPicker: boolean) => void
}

export default function ColourInputs({ colour, showColourPicker, setShowColourPicker }: ColourInputsProps) {
  return (
    <View style={styles.colorPickerPreview}>
      <Pressable style={{...styles.openPickerButton, backgroundColor: colour}} onPress={() => setShowColourPicker(!showColourPicker)}></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  colorPickerPreview: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  openPickerButton: {
    height: Spacing.unit,
    width: Spacing.unit,
    marginTop: Spacing.unit1o5,
    borderWidth: Spacing.border,
    borderColor: Colors.black,
    borderRadius: Spacing.unit1o5,
  }
});
