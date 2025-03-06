import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortGamesAction } from '@/store/gameReducer';
import CustomButton from './CustomButton';

interface SortButtonProps {
  filterMode: string,
  iconName: string,
  currentSortMode: string,
  setSortMode: (data: string) => void,
  isDisabled: boolean
}

export default function SortButton({filterMode, iconName, currentSortMode, setSortMode, isDisabled}: SortButtonProps) {
  const dispatch = useDispatch();

  function handleSortPress() {
    dispatch(sortGamesAction({sort: filterMode})); 
    setSortMode(filterMode);
  }

  return (
    <CustomButton
      size={'small'}
      iconName={iconName}
      isDisabled={isDisabled}
      isPressed={filterMode === currentSortMode}
      pressFunction={handleSortPress}
    />
  );
}