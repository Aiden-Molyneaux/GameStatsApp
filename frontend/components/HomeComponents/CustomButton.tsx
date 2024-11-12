import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  GameListItem, PartialGameListItem, addGameAction } from '@/store/gameReducer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { RootState } from '../../store/store';
import { requestCreateGame } from '@/api/gameRequests';
import { Game, PartialGame } from '../../../backend/models/gameModel';

interface AddGameBtnProps {
  size: string,
  iconName: string,
  isDisabled: boolean,
  isPressed: boolean,
  pressFunction: (data: unknown) => void
}

export default function CustomButton({ size, iconName, isDisabled, isPressed, pressFunction }: AddGameBtnProps) {
  return ( 
    size === 'small' 
      ? <SmallCustomButton
        size={size}
        iconName={iconName}
        isDisabled={isDisabled}
        isPressed={isPressed}
        pressFunction={pressFunction}/>
      : <LargeCustomButton
        size={size}
        iconName={iconName}
        isDisabled={isDisabled}
        isPressed={isPressed}
        pressFunction={pressFunction}/>
  );
}

function SmallCustomButton({ size, iconName, isDisabled, isPressed, pressFunction }: AddGameBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  const animatedHeight = useRef(new Animated.Value(isHovered || isPressed ? Spacing.unit - Spacing.unit1o5 : Spacing.unit)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isHovered || isPressed ? Spacing.unit - Spacing.unit1o10 / 2 : Spacing.unit + Spacing.unit1o10, // Adjust height for open/closed
      duration: 300, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [isHovered, isPressed ]);

  const isCaret = iconName === 'caret-up' || iconName === 'caret-down';

  return (
    <Animated.View style={{...styles.smallButtonContainer, height: animatedHeight, ...(isCaret ? styles.isCaret : {})}}>
      <Pressable
        style={[ isDisabled ? { ...styles.addGameButton, backgroundColor: Colors.gray } : styles.addGameButton ]}
        disabled={isDisabled}
        onPress={pressFunction} 
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <View style={{...styles.smallTopOfButton, backgroundColor: isPressed ? Colors.orange : Colors.gray }}>
          <View style={styles.iconContainer}>  
            <FontAwesome size={FontSizes.mediumLess} name={iconName} color={Colors.white} />
          </View>

        </View>
        <View style={{...styles.smallBottomOfButton, backgroundColor: isPressed ? Colors.orange : Colors.gray}}></View>
      </Pressable>

    </Animated.View>
  );
}

function LargeCustomButton({ size, iconName, isDisabled, isPressed, pressFunction }: AddGameBtnProps) {
  const [isHovered, setIsHovered] = useState(false);

  const animatedHeight = useRef(new Animated.Value(isHovered || isPressed ? Spacing.unit3o2 - Spacing.unit1o5 : Spacing.unit3o2)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isHovered || isPressed ? Spacing.unit3o2 - Spacing.unit1o5 : Spacing.unit3o2, // Adjust height for open/closed
      duration: 300, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [isHovered, isPressed ]);

  return (
    <Animated.View style={{...styles.bigButtonContainer, height: animatedHeight }}>
      <Pressable
        style={[ isDisabled ? { ...styles.addGameButton, backgroundColor: Colors.gray } : styles.addGameButton ]}
        disabled={isDisabled}
        onPress={pressFunction} 
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
      >
        <View style={{...styles.bigTopOfButton, backgroundColor: isPressed ? Colors.orange : Colors.gray }}>
          <View style={styles.iconContainer}>  
            <FontAwesome size={FontSizes.medium} name={iconName} color={Colors.white} />
          </View>

        </View>
        <View style={{...styles.bigBottomOfButton, backgroundColor: isPressed ? Colors.orange : Colors.gray}}></View>
      </Pressable>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bigButtonContainer: {
    height: Spacing.unit3o2,
  },
  addGameButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  bigTopOfButton: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing.unit,
    width: Spacing.unit3o2,
    backgroundColor: Colors.gray,
    borderWidth: Spacing.border,
    borderRadius: 15,
    zIndex: 3
  },
  bigBottomOfButton: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: Spacing.unit3o2,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
  },

  iconContainer: {
    textShadow: `${Colors.black} 1px 1px 1px`
  },

  smallButtonContainer: {
    height: Spacing.unit
  },
  smallTopOfButton: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing.unit1o5 * 4,
    width: Spacing.unit,
    backgroundColor: Colors.gray,
    borderWidth: Spacing.border,
    borderRadius: 15,
    zIndex: 3
  },
  smallBottomOfButton: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: Spacing.unit,
    backgroundColor: Colors.gray,
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
  },
  isCaret: {
    marginRight: 20
  }
});