import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOpenCloseStatusAction } from '@/store/gameReducer';
import CustomButton from './CustomButton';

interface OpenCloseButtonProps {
  mode: string,
  iconName: string,
  isDisabled: boolean
}

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export default function OpenCloseButton({mode, iconName, isDisabled}: OpenCloseButtonProps) {
  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false);

  async function handlePress() {
    setIsPressed(true);
    dispatch(setOpenCloseStatusAction({ mode: mode }));
    await timeout(300);
    setIsPressed(false);
  }
  
  return (
    <CustomButton
      size={'small'}
      iconName={iconName}
      isDisabled={isDisabled}
      isPressed={isPressed}
      pressFunction={handlePress}
    />
  );
}