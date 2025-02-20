import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  GameListItem, PartialGameListItem, addGameAction } from '@/store/gameReducer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { RootState } from '../../store/store';
import { requestCreateGame } from '@/api/gameRequests';
import { Game, PartialGame } from '../../../backend/models/gameModel';
import { Text } from '../Customs';

interface NavigationButtonProps {
  labelText: string,
  iconName: string,
  isPressed: boolean,
}

export default function NavigationButton({labelText, iconName, isPressed}: NavigationButtonProps) {
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
      <View
        style={[ styles.addGameButton ]}
      >
        <View style={{
          ...styles.bigTopOfButton, 
          backgroundColor: isPressed ? Colors.orange : Colors.grayPrime,
          borderColor: isPressed ? Colors.orangeEdge : Colors.grayEdge 
        }}>
          <View style={styles.iconContainer}>  
            <FontAwesome size={FontSizes.large} name={iconName} color={Colors.white} />
            <Text style={styles.navButtonText}>{labelText}</Text>
          </View>

        </View>
        <View style={{
          ...styles.bigBottomOfButton, 
          backgroundColor: isPressed ? Colors.orange : Colors.grayPrime,
          borderColor: isPressed ? Colors.orangeEdge : Colors.grayEdge,
        }}/>
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bigButtonContainer: {

    height: Spacing.unit3o2,
    width: Spacing.unit5,
  },
  navButtonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    width: Spacing.unit5,
    borderWidth: Spacing.border,
    borderRadius: 15,
    zIndex: 3
  },
  bigBottomOfButton: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: Spacing.unit5,
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
  },

  iconContainer: {
    flexDirection: 'row',
    gap: Spacing.unit1o5,
    textShadow: `${Colors.black} 1px 1px 1px`
  },
});