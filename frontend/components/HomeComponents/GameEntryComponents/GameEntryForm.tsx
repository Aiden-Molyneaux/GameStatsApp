import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from '../../ToggleModeBtn';
import { GameListItem, updateGameAction, deleteGameAction } from '@/store/gameReducer';
import DeleteGameEntryBtn from './DeleteGameEntryButton';
import { Game, requestDeleteGame, requestUpdateGame } from '@/api/gameRequests';
import { CustomColourPicker } from './ColourPicker';
import LabeledInput from '../LabeledInput';
import Index from './Index';
import TitleInput from './TitleInput';
import StatisticInputs from './StatisticInputs';
import ColourInputs from './ColourInputs';
import FormButtons from './FormButtons';

interface GameEntryFormProps {
  index: number,
  gameData: GameListItem,
  setGameData: (data: Game) => void,
  closeEditForm: () => void,
  setIsPressed: (data: boolean) => void
}

export default function GameEntryForm({ index, gameData, setGameData, closeEditForm, setIsPressed }: GameEntryFormProps) {
  const [formData, setFormData] = useState({ 
    ...gameData, 
    tempTitleColour: gameData.titleColour, 
    tempHeaderColour: gameData.headerColour 
  });

  function handleTextInputChange(field: string, value: string) {
    setFormData({
      ...formData, 
      [field]: field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value 
    });
  }

  function setColourData(headerColour: string, titleColour: string) {
    setFormData({
      ...formData,
      tempTitleColour: titleColour,
      tempHeaderColour: headerColour
    });
  }

  return (
    <View style={styles.gameEntryContainer}>
      <Index index={index}/>
      <View style={styles.gameEntry}>
        <TitleInput
          name={formData.name}
          tempHeaderColour={formData.tempHeaderColour}
          tempTitleColour={formData.tempTitleColour}
          handleTextInputChange={handleTextInputChange}
        />
        
        <View style={styles.expandedGame}>
          <View style={styles.gameStats}>
            <ColourInputs
              tempHeaderColour={formData.tempHeaderColour}
              tempTitleColour={formData.tempTitleColour}
              setColourData={setColourData}
            />

            <StatisticInputs
              formData={formData}
              handleTextInputChange={handleTextInputChange}
            />
          </View>
        </View>
      </View>

      <FormButtons
        formData={formData}
        setGameData={setGameData}
        closeEditForm={closeEditForm}
        setIsPressed={setIsPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gameEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderTopWidth: Spacing.border
  },
  gameEntry: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: Spacing.unit1o5
  },
  expandedGame: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.screenGray
  },
  gameStats: {
    flex: 1,
    gap: Spacing.unit1o10,
    paddingTop: Spacing.unit1o5,
    paddingHorizontal: Spacing.unit1o5
  },
});
