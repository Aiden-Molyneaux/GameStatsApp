import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import DeleteGameEntryBtn from './DeleteGameEntryButton';
import { Game, requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';
import { CustomColourPicker } from './CustomColourPicker';
import LabeledInput from '../LabeledInput';
import Index from './Index';

interface TitleInputProps {
  name: string,
  tempHeaderColour: string,
  tempTitleColour: string,
  handleTextInputChange: (field: string, value: string) => void
}

export default function TitleInput({ name, tempHeaderColour, tempTitleColour, handleTextInputChange }: TitleInputProps) {
  return (
    <View style={{...styles.titleCard, backgroundColor: tempHeaderColour}}>
      <TextInput
        placeholder='Title'
        style={{
          ...styles.titleInput, 
          color: tempTitleColour, 
          backgroundColor: tempHeaderColour,
          borderBottomColor: name === '' ? Colors.red : Colors.orange,
        }}
        value={name || ''}
        onChangeText={(value) => handleTextInputChange('name', value)}
        maxLength={60}
        // multiline={true}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleCard: {
    alignItems: 'center',
    padding: Spacing.unit1o5,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: 10,
  },
  titleInput: {
    width: '80%',
    fontSize: FontSizes.larger,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
  },
});
