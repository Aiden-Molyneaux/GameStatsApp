import React from 'react';
import { GameListItem } from '@/store/gameReducer';
import LabeledInput from '../LabeledInput';


interface StatisticInputsProps {
  formData: GameListItem,
  handleTextInputChange: (field: string, value: string) => void
}

export default function StatisticInputs({ formData, handleTextInputChange  }: StatisticInputsProps) {

  function formatDateInput(value: string): string | null {
    // Remove any non-digit characters from input
    const numbers = value.replace(/\D/g, '');
    
    // Handle empty input
    if (numbers.length === 0) { return null; }
    
    // Format the date with hyphens
    let formattedDate = numbers;
    if (numbers.length >= 4) {
      formattedDate = numbers.slice(0, 4) + '-' + numbers.slice(4);
    }
    if (numbers.length >= 6) {
      formattedDate = formattedDate.slice(0, 7) + '-' + formattedDate.slice(7);
    }
    
    return formattedDate;
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
        onChangeText={(value) => handleTextInputChange('percentComplete', value)}
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