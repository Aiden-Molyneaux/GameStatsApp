import React, { useState } from 'react';
import { GameListItem } from '@/store/gameReducer';
import LabeledInput from '../LabeledInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Text } from '@/components/Customs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface StatisticInputsProps {
  formData: GameListItem,
  handleTextInputChange: (field: string, value: string) => void
}

export default function StatisticInputs({ formData, handleTextInputChange  }: StatisticInputsProps) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <>
      <LabeledInput
        label='Hours Played'
        placeholder='0'
        value={formData.hours ? String(formData.hours) : ''}
        onChangeText={(value) => handleTextInputChange('hours', value)}
        keyboardType='number-pad'
        maxLength={6}
      />
      <LabeledInput
        label='Percent Complete'
        placeholder='0%'
        value={formData.percentComplete ? String(formData.percentComplete) : ''}
        onChangeText={(value) => {
          const numValue = parseInt(value);
          if (isNaN(numValue)) {
            handleTextInputChange('percentComplete', 0);
          } else {
            const clampedValue = Math.min(100, Math.max(0, numValue));
            handleTextInputChange('percentComplete', String(clampedValue));
          }
        }}
        keyboardType='number-pad'
        maxLength={3}
      />
      <View style={styles.container}>
        <Text style={styles.inputLabel}>Date Purchased: </Text>
        <Pressable style={styles.inputTextContainer} onPress={() => setDatePickerVisible(true)}>
          <Text style={{...styles.inputText, color: formData.datePurchased ? Colors.black : Colors.gray}}>{formData.datePurchased ? String(formData.datePurchased).split('T')[0] : 'YYYY-MM-DD'}</Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            handleTextInputChange('datePurchased', date.toISOString());
            setDatePickerVisible(false);
          }}
          onCancel={() => setDatePickerVisible(false)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.unit1o5,
  },
  inputTextContainer: {
    flex: 1,
    margin: Spacing.unit1o10,
    marginLeft: 0,
  },
  inputText: {
    color: Colors.gray,
    borderBottomColor: Colors.orange,
    borderBottomWidth: Spacing.border,
    textAlign: 'right',
  },
  inputLabel: {
    textAlign: 'left',
  },
});