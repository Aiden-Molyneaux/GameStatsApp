import React from 'react';
import { View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Text, TextInput } from '../Customs';
import { Spacing, FontSizes } from '../../constants/Constants';

interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

export default function LabeledInput({ label, placeholder, value, onChangeText, keyboardType = 'default', maxLength = 16, secureTextEntry = false }: LabeledInputProps) {
  return (  
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{label}:</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.unit1o5,
  },
  inputLabel: {
    fontSize: FontSizes.medium,
  },
  input: {
    flex: 1,
    margin: Spacing.unit1o10,
    marginLeft: 0,
  },
});