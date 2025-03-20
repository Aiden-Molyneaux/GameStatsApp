import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortGamesAction } from '@/store/gameReducer';
import CustomButton from './CustomButton';
import { RootState } from '@/store/store';

interface SortButtonProps {
  sortType: string,
  iconName: string,
}

export default function SortButton({ sortType, iconName }: SortButtonProps) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.authData.isAuthenticated);
  const sortMode = useSelector((state: RootState) => state.gameData.sortMode);

  function handleSortPress() {
    dispatch(sortGamesAction({sortMode: sortType})); 
  }

  return (
    <CustomButton
      size={'small'}
      iconName={iconName}
      isDisabled={!isAuthenticated}
      isPressed={isAuthenticated && sortMode === sortType}
      pressFunction={handleSortPress}
    />
  );
}