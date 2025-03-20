import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import { ColourPicker } from './ColourPicker';
import ColourPreviewButton from './ColourPreviewButton';

interface ColourInputsProps {
  tempHeaderColour: string,
  tempTitleColour: string,
  setColourData: (headerColour: string, titleColour: string) => void,
  isColorValid: boolean,
  setIsColorValid: (isValid: boolean) => void,
  showTitleColourPicker: boolean,
  showHeaderColourPicker: boolean,
  setShowTitleColourPicker: (value: boolean) => void,
  setShowHeaderColourPicker: (value: boolean) => void
}

export default function ColourInputs({ tempHeaderColour, tempTitleColour, setColourData, isColorValid, setIsColorValid, showTitleColourPicker, showHeaderColourPicker, setShowTitleColourPicker, setShowHeaderColourPicker }: ColourInputsProps) {
  // State to track if we should display the pickers (separate from state controlling form expansion)
  const [displayTitlePicker, setDisplayTitlePicker] = useState(false);
  const [displayHeaderPicker, setDisplayHeaderPicker] = useState(false);
  
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showTitleColourPicker && !displayTitlePicker) {
      animatedOpacity.setValue(0);
      
      setTimeout(() => {
        setDisplayTitlePicker(true);
        
        // Fade in
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, 300);
    } 
    else if (!showTitleColourPicker && displayTitlePicker) {
      // Fade out
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setDisplayTitlePicker(false);
      });
    }
  }, [showTitleColourPicker]);

  useEffect(() => {
    if (showHeaderColourPicker && !displayHeaderPicker) {
      animatedOpacity.setValue(0);
      
      setTimeout(() => {
        setDisplayHeaderPicker(true);
        
        // Fade in
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }, 300);
    } 
    else if (!showHeaderColourPicker && displayHeaderPicker) {
      // Fade out
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setDisplayHeaderPicker(false);
      });
    }
  }, [showHeaderColourPicker]);

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
          <ColourPreviewButton 
            colour={tempTitleColour} 
            showColourPicker={showTitleColourPicker} 
            setShowColourPicker={setShowTitleColourPickerWrapper}
          />
        </View>

        <View style={styles.colorPickerControl}>
          <Text>Header Colour: </Text>
          <ColourPreviewButton 
            colour={tempHeaderColour} 
            showColourPicker={showHeaderColourPicker} 
            setShowColourPicker={setShowHeaderColourPickerWrapper}
          />
        </View>
      </View>

      {/* Use the display state to determine if picker should be rendered */}
      {showTitleColourPicker && displayTitlePicker && 
        <Animated.View style={{ ...styles.colourPicker, opacity: animatedOpacity }}>
          <ColourPicker 
            colour={tempTitleColour} 
            setColour={(colour) => setColourData(tempHeaderColour, colour)} 
            isColorValid={isColorValid} 
            setIsColorValid={setIsColorValid}
          /> 
        </Animated.View>
      }
      
      {showHeaderColourPicker && displayHeaderPicker && 
        <Animated.View style={{ ...styles.colourPicker, opacity: animatedOpacity }}>
          <ColourPicker 
            colour={tempHeaderColour} 
            setColour={(colour) => setColourData(colour, tempTitleColour)} 
            isColorValid={isColorValid} 
            setIsColorValid={setIsColorValid}
          /> 
        </Animated.View>
      }
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
  colourPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.unit1o5,
    height: 200,
    width: '100%',
  }
});
