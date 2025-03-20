import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes } from '@/constants/Constants';
import { TextInput } from '@/components/Customs';

interface TitleInputProps {
  name: string;
  tempHeaderColour: string;
  tempTitleColour: string;
  handleTextInputChange: (value: string) => void;
}

export default function TitleInput({ name, tempHeaderColour, tempTitleColour, handleTextInputChange }: TitleInputProps) {
  // Track the local input value
  const [inputValue, setInputValue] = useState(name);

  const handleChange = (text: string) => {
    setInputValue(text);
    handleTextInputChange(text);
  };

  return (
    <View 
      style={[
        styles.titleCard,
        { backgroundColor: tempHeaderColour }
      ]}
    >
      <TextInput
        style={{
          ...styles.titleInput,
          color: tempTitleColour,
          backgroundColor: tempHeaderColour,
          borderBottomColor: name === '' ? Colors.red : Colors.orange,
        }}
        value={inputValue || ''}
        onChangeText={handleChange}
        placeholder='Game Title'
        placeholderTextColor={Colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.unit1o5,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: 10,
  },
  titleInput: {
    width: '80%',
    fontSize: FontSizes.larger,
    letterSpacing: 3,
    textAlign: 'center',
  },
});
