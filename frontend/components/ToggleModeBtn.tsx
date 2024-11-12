import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import FontAwesome  from '@expo/vector-icons/FontAwesome';

interface ToggleModeBtnProps {
  type: string;
  iconName: string;
  isDisabled: boolean;
  pressFunction: (data: unknown) => void;
}

export default function ToggleModeBtn({type, iconName, isDisabled = false, pressFunction}: ToggleModeBtnProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStyleByType = (type: string) => {
    switch (type) {
    case 'edit':
      return styles.edit;
    case 'save':
      return styles.edit;
    case 'editGame':
      return styles.editGame;
    case 'saveGame':
      return styles.editGame;
    case 'view':
      return styles.view;
    default:
      return styles.edit;
    }
  };

  return (
    <Pressable 
      style={[
        getStyleByType(type),
        { opacity: isDisabled ? 0.5 : 1 }, // Reduce opacity if disabled
      ]}
      disabled={isDisabled}
      onPress={pressFunction}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <FontAwesome 
        size={isHovered ? FontSizes.large : FontSizes.medium}
        name={iconName}
        color={(isDisabled) ? Colors.gray : Colors.orange} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  edit: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
    justifyContent: 'center',
    alignItems: 'center',
    width: FontSizes.large,
    height: FontSizes.large,
  },
  editGame: {
    justifyContent: 'center',
    alignItems: 'center',
    width: FontSizes.large,
    height: FontSizes.large,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: FontSizes.large,
    height: FontSizes.large,
  },

});