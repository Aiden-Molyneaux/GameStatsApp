import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import {LinearGradient} from 'expo-linear-gradient';

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
        iconName={iconName}
        isDisabled={isDisabled}
        isPressed={isPressed}
        pressFunction={pressFunction}/>
      : <LargeCustomButton
        iconName={iconName}
        isDisabled={isDisabled}
        isPressed={isPressed}
        pressFunction={pressFunction}/>
  );
}

function SmallCustomButton({ iconName, isDisabled, isPressed, pressFunction }: AddGameBtnProps) {
  const animatedHeight = useRef(new Animated.Value(isPressed ? Spacing.unit - Spacing.unit1o5 : Spacing.unit)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isPressed ? Spacing.unit - Spacing.unit1o10 / 2 : Spacing.unit + Spacing.unit1o10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [ isPressed ]);

  const isCaret = iconName === 'caret-up' || iconName === 'caret-down';

  return (
    <Animated.View style={{...styles.smallButtonContainer, height: animatedHeight, ...(isCaret ? styles.isCaret : {})}}>
      <Pressable
        style={[ isDisabled ? { ...styles.addGameButton, backgroundColor: Colors.gray } : styles.addGameButton ]}
        disabled={isDisabled}
        onPress={pressFunction} 
      >
        <View style={{
          ...styles.smallTopOfButton, 
          borderColor: isPressed ? Colors.greenEdge : Colors.grayEdge  
        }}>
          <LinearGradient
            colors={isPressed 
              ? [Colors.green, Colors.greenPrime] 
              : [Colors.gray, Colors.grayPrime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.topGradient}
          >
            <View style={styles.iconContainer}>  
              <FontAwesome size={FontSizes.mediumLess} name={iconName} color={Colors.white} />
            </View>
          </LinearGradient>
        </View>
        <View style={{
          ...styles.smallBottomOfButton, 
          borderColor: isPressed ? Colors.greenEdge : Colors.grayEdge 
        }}>
          <LinearGradient
            colors={isPressed 
              ? [Colors.green, Colors.greenPrime]
              : [Colors.gray, Colors.grayPrime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bottomGradient}
          />
        </View>
        <View style={styles.smallIndentation}/>
      </Pressable>
    </Animated.View>
  );
}

function LargeCustomButton({ iconName, isDisabled, isPressed, pressFunction }: AddGameBtnProps) {
  const animatedHeight = useRef(new Animated.Value(isPressed ? Spacing.unit3o2 - Spacing.unit1o5 : Spacing.unit3o2)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isPressed ? Spacing.unit3o2 - Spacing.unit1o5 : Spacing.unit3o2,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [ isPressed ]);

  return (
    <Animated.View style={{...styles.bigButtonContainer, height: animatedHeight }}>
      <Pressable
        style={[ isDisabled ? { ...styles.addGameButton, backgroundColor: Colors.gray } : styles.addGameButton ]}
        disabled={isDisabled}
        onPress={pressFunction} 
      >
        <View style={{
          ...styles.bigTopOfButton, 
          borderColor: isPressed ? Colors.orangeEdge : Colors.grayEdge 
        }}>
          <LinearGradient
            colors={isPressed 
              ? [Colors.orange, Colors.orange]
              : [Colors.gray, Colors.grayPrime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.topGradient}
          >
            <View style={styles.iconContainer}>  
              <FontAwesome size={FontSizes.medium} name={iconName} color={Colors.white} />
            </View>
          </LinearGradient>
        </View>
        <View style={{
          ...styles.bigBottomOfButton, 
          borderColor: isPressed ? Colors.orangeEdge : Colors.grayEdge,
        }}>
          <LinearGradient
            colors={isPressed 
              ? [Colors.orange, Colors.orange]
              : [Colors.gray, Colors.grayPrime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bottomGradient}
          />
        </View>
        <View style={styles.largeIndentation}/>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bigButtonContainer: {
    flex: 1,
    height: Spacing.unit3o2,
    alignSelf: 'flex-end'
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
    width: '100%',
    borderWidth: Spacing.border,
    borderRadius: 15,
    zIndex: 3
  },
  bigBottomOfButton: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderBottomWidth: Spacing.border,
  },
  largeIndentation: {
    position: 'absolute',
    bottom: -Spacing.unit1o10,
    backgroundColor: Colors.grayPrime,
    height: '60%',
    width: '102%',
    borderRadius: 15,
    zIndex: -1
  },
  smallIndentation: {
    position: 'absolute',
    bottom: -Spacing.unit1o10,
    backgroundColor: Colors.grayPrime,
    height: '80%',
    width: '106%',
    borderRadius: 30,
    zIndex: -1
  },
  smallButtonContainer: {
    height: Spacing.unit,
    width: Spacing.unit
  },
  smallTopOfButton: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing.unit1o5 * 4,
    width: Spacing.unit,
    borderWidth: Spacing.border,
    borderRadius: 15,
    zIndex: 3
  },
  smallBottomOfButton: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: Spacing.unit,

    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
  },
  isCaret: {
    marginRight: 20
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 13,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});