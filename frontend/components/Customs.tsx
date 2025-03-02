import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import React, { useState } from 'react';
import { Text as RNText, TextInput as RNTextInput, StyleSheet, TextStyle, TextProps, TextInputProps } from 'react-native';

interface CustomTextProps extends TextProps {
  style?: TextStyle;
}

interface CustomTextInputProps extends TextInputProps {
  style?: TextStyle;
}

export const Text: React.FC<CustomTextProps> = ({ style, ...props }) => {
  return <RNText style={[styles.defaultTextStyle, style]} {...props} />;
};

export const TextInput: React.FC<CustomTextInputProps> = ({ style, ...props }) => {

  return <RNTextInput 
    style={[styles.defaultTextInputStyle, style]}
    placeholderTextColor={Colors.gray}
    {...props} 
  />;
};

const styles = StyleSheet.create({
  defaultTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.pixel,
    fontSize: FontSizes.medium,
    textAlign: 'center'
  } as TextStyle,
  defaultTextInputStyle: {
    fontFamily: Fonts.pixel,
    fontSize: FontSizes.medium,
    borderBottomColor: Colors.orange,
    borderBottomWidth: Spacing.border
  } as TextStyle
});