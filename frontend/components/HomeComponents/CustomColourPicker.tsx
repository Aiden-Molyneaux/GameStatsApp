import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/Constants';
import { GameListItem } from '@/store/gameReducer';
import ColorPicker, { Panel1, Swatches, OpacitySlider, HueSlider, colorKit, PreviewText, Preview } from 'reanimated-color-picker';
import type { returnedResults } from 'reanimated-color-picker';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Text } from '../Customs';

interface ColourPickerProps {
  colour: string,
  setColour: (data: string) => null;
}

export function CustomColourPicker({colour, setColour}: ColourPickerProps) {
  const firstSwatch = [colour];
  const customSwatches = firstSwatch.concat(new Array(5).fill('#fff').map(() => colorKit.randomRgbColor().hex()));
  const selectedColor = useSharedValue(customSwatches[0]);

  function getColour() {
    return selectedColor.value;
  }

  const onColorSelect = (color: returnedResults) => {
    'worklet';
    selectedColor.value = color.hex;
    setColour(color.hex);
  };

  return (
    <View style={styles.pickerContainer}>
      <ColorPicker
        value={selectedColor.value}
        sliderThickness={25}
        thumbSize={24}
        thumbShape='circle'
        onChange={onColorSelect}
        boundedThumb
      >
              
        <View style={styles.new}>
          <Panel1 style={styles.panelStyle} />
          <HueSlider style={styles.sliderStyle} />
        </View>
        {/* <OpacitySlider style={styles.sliderStyle} /> */}
        {/* <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} /> */}
        {/* <View style={styles.previewTxtContainer}>
              <PreviewText style={{ color: '#707070' }} />
            </View> */}
      </ColorPicker>
    </View>

  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  panelStyle: {
    height: 100,
    width: 200,
  },

  sliderStyle: {
    height: 25,
    width: 200
  }
});