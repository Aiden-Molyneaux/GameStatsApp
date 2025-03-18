import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Constants';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';
import LabeledInput from '../LabeledInput';

interface ColourPickerProps {
  colour: string;
  setColour: (color: string) => void;
  isColorValid: boolean;
  setIsColorValid: (isValid: boolean) => void;
}

export function ColourPicker({ colour, setColour, isColorValid, setIsColorValid }: ColourPickerProps) {
  const onColorSelect = (color: returnedResults) => {
    handleColourChange(color.hex);  
  };
  
  function handleColourChange(input: string) {
    const colorString = input.startsWith('#') ? input : '#' + input;
    
    const isValid = colorString.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(colorString);

    setIsColorValid(isValid);
    setColour(colorString);
  }

  return (
    <View style={styles.pickerContainer}>
      <LabeledInput
        label='Colour Hex'
        placeholder='#111111'
        value={colour.toUpperCase()}
        onChangeText={handleColourChange}
        maxLength={7}
        invalidInput={!isColorValid}
      />
      <ColorPicker value={colour} onComplete={onColorSelect} style={styles.picker}>
        <Panel1 style={styles.panelStyle} />
        <HueSlider style={styles.sliderStyle} />
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.unit1o5,
  },
  picker: {
    width: '100%',
    gap: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5,
  },
  panelStyle: {
    height: 120,
    borderRadius: Spacing.unit1o5,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  sliderStyle: {
    width: '100%',
    height: 30,
    borderRadius: Spacing.unit1o5,
    borderWidth: 1,
    borderColor: Colors.black,
  }
});