import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Constants';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';
import { useSharedValue } from 'react-native-reanimated';

interface ColourPickerProps {
  colour: string;
  setColour: (color: string) => void;
}

export function CustomColourPicker({ colour, setColour }: ColourPickerProps) {
  const selectedColor = useSharedValue(colour);

  const onColorSelect = (color: returnedResults) => {
    selectedColor.value = color.hex;
    setColour(color.hex);
  };

  return (
    <View style={styles.pickerContainer}>
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