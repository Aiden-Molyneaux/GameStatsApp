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
  setColour: (data: unknown) => null;
}

export function CustomColourPicker({colour, setColour}: ColourPickerProps) {
  const [showModal, setShowModal] = useState(false);

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
    <>
      
      <Pressable style={{...styles.openButton, backgroundColor: getColour(), width: showModal ? '100%' : Spacing.unit}} onPress={() => setShowModal(true)}></Pressable>

      { showModal && <View>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={24}
              thumbShape='circle'
              onChange={onColorSelect}
              boundedThumb
            >

              <Panel1 style={styles.panelStyle} />
              <HueSlider style={styles.sliderStyle} />
              {/* <OpacitySlider style={styles.sliderStyle} /> */}
              {/* <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} colors={customSwatches} /> */}
              {/* <View style={styles.previewTxtContainer}>
              <PreviewText style={{ color: '#707070' }} />
            </View> */}
            </ColorPicker>
          </View>
          <Pressable style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={{ color: '#707070', fontWeight: 'bold' }}>Close</Text>
          </Pressable>
        </View>
      </View> }
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  openButton: {
    height: Spacing.unit,
    width: Spacing.unit,
    borderWidth: Spacing.border,
    borderColor: Colors.black,
  },
  closeButton: {
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 250,

  },
  panelStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});