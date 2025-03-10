import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortGamesAction } from '@/store/gameReducer';
import CustomButton from './CustomButton';
import { RootState } from '@/store/store';

interface SortButtonProps {
  filterMode: string,
  iconName: string,
  currentSortMode: string,
  setSortMode: (data: string) => void,
}

export default function SortButton({ filterMode, iconName, currentSortMode, setSortMode }: SortButtonProps) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);

  function handleSortPress() {
    dispatch(sortGamesAction({sort: filterMode})); 
    setSortMode(filterMode);
  }

  return (
    <CustomButton
      size={'small'}
      iconName={iconName}
      isDisabled={!isAuthenticated}
      isPressed={isAuthenticated && filterMode === currentSortMode}
      pressFunction={handleSortPress}
    />
  );
}