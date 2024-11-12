import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortGamesAction } from '@/store/gameReducer';
import CustomButton from './CustomButton';

interface SortBtnProps {
  filterMode: string,
  iconName: string,
  currentSortMode: string,
  setSortMode: (data: string) => void
}

export default function SortBtn({filterMode, iconName, currentSortMode, setSortMode}: SortBtnProps) {
  const dispatch = useDispatch();

  function handleSortPress() {
    dispatch(sortGamesAction({sort: filterMode})); 
    setSortMode(filterMode);
  }

  return (
    <CustomButton
      size={'small'}
      iconName={iconName}
      isDisabled={false}
      isPressed={filterMode === currentSortMode}
      pressFunction={handleSortPress}
    />
  );
}