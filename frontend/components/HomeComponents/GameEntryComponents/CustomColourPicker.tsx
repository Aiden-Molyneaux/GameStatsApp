import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Constants';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';
import LabeledInput from '../LabeledInput';

interface ColourPickerProps {
  colour: string;
  setColour: (color: string) => void;
}

export function CustomColourPicker({ colour, setColour }: ColourPickerProps) {
  const onColorSelect = (color: returnedResults) => {
    setColour(color.hex);
  };
  
  function validateHex(hex: string) {
    if (hex.startsWith('#') && hex.length === 7) {
      return hex;
    }
    return `#${hex}`;
  }

  function handleColourChange(hex: string) {
    const validatedHex = validateHex(hex);
    setColour(validatedHex);
  }

  return (
    <View style={styles.pickerContainer}>
      <LabeledInput
        label='Colour Hex'
        placeholder='#111111'
        value={colour}
        onChangeText={handleColourChange}
      />
      <ColorPicker
        value={colour}
        onComplete={onColorSelect}
        style={styles.picker}
      >
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
    padding: Spacing.unit1o5,
    paddingBottom: 0,
  },
  picker: {
    width: '100%',
    gap: Spacing.unit1o5,
  },
  panelStyle: {
    height: 120,
    borderRadius: Spacing.unit1o5,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  sliderStyle: {
    height: 30,
    borderRadius: Spacing.unit1o5,
    borderWidth: 1,
    borderColor: Colors.black,
  }
});