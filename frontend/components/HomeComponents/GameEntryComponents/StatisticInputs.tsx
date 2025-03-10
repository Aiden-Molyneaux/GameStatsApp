import React from 'react';
import { GameListItem } from '@/store/gameReducer';
import LabeledInput from '../LabeledInput';


interface StatisticInputsProps {
  formData: GameListItem,
  handleTextInputChange: (field: string, value: string) => void
}

export default function StatisticInputs({ formData, handleTextInputChange  }: StatisticInputsProps) {

  function formatDateInput(value: string): string | null {
    // Remove all non-digits and hyphens
    const cleanValue = value.replace(/[^\d-]/g, '');
    
    // If empty or just hyphens, return null
    if (!cleanValue || cleanValue.replace(/-/g, '').length === 0) {
      return null;
    }

    // Remove all hyphens and get just numbers
    const numbers = cleanValue.replace(/-/g, '');
    
    // Build the date string
    let result = '';
    for (let i = 0; i < numbers.length; i++) {
      if (i === 4 || i === 6) {
        result += '-';
      }
      result += numbers[i];
    }
    
    return result;
  }

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
      <LabeledInput
        label='Date Purchased'
        placeholder='YYYY-MM-DD'
        value={formData.datePurchased ? String(formData.datePurchased).split('T')[0] : ''}
        onChangeText={(value) => {
          const formattedDate = formatDateInput(value);
          handleTextInputChange('datePurchased', formattedDate);
        }}
        keyboardType='number-pad'
        maxLength={10}
      />
    </>
  );
}