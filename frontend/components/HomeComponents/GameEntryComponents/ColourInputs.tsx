import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import { ColourPicker } from './ColourPicker';
import ColourPreviewButton from './ColourPreviewButton';

interface ColourInputsProps {
  tempHeaderColour: string,
  tempTitleColour: string,
  setColourData: (headerColour: string, titleColour: string) => void
}

export default function ColourInputs({ tempHeaderColour, tempTitleColour, setColourData }: ColourInputsProps) {
  const [showTitleColourPicker, setShowTitleColourPicker] = useState(false);
  const [showHeaderColourPicker, setShowHeaderColourPicker] = useState(false);
  const setShowTitleColourPickerWrapper = (value: boolean) => {
    if (value && showHeaderColourPicker) {
      setShowHeaderColourPicker(false);
    }
    setShowTitleColourPicker(value);
  };

  const setShowHeaderColourPickerWrapper = (value: boolean) => {
    if (value && showTitleColourPicker) {
      setShowTitleColourPicker(false);
    }
    setShowHeaderColourPicker(value);
  };

  return (
    <>
      <View style={styles.colorPickerControls}>
        <View style={styles.colorPickerControl}>
          <Text>Title Colour: </Text>
          <ColourPreviewButton colour={tempTitleColour} showColourPicker={showTitleColourPicker} setShowColourPicker={setShowTitleColourPickerWrapper}/>
        </View>

        <View style={styles.colorPickerControl}>
          <Text>Header Colour: </Text>
          <ColourPreviewButton colour={tempHeaderColour} showColourPicker={showHeaderColourPicker} setShowColourPicker={setShowHeaderColourPickerWrapper}/>
        </View>
      </View>


      { showTitleColourPicker && <ColourPicker colour={tempTitleColour} setColour={(colour) => setColourData(tempHeaderColour, colour)}/> }
      { showHeaderColourPicker && <ColourPicker colour={tempHeaderColour} setColour={(colour) => setColourData(colour, tempTitleColour)}/> }
    </>
  );
}

const styles = StyleSheet.create({
  colorPickerControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorPickerControl: {
    flex: 1,

  },

});
