import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors, FontSizes, Spacing, Fonts } from '@/constants/Constants';
import { Text } from '../Customs';
import { LinearGradient } from 'expo-linear-gradient';

interface NavigationButtonProps {
  labelText: string,
  iconName: string,
  isPressed: boolean,
}

export default function NavigationButton({labelText, iconName, isPressed}: NavigationButtonProps) {
  const animatedHeight = useRef(new Animated.Value(isPressed ? Spacing.unit3o2 - Spacing.unit1o5 : Spacing.unit3o2)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isPressed ? Spacing.unit3o2 - Spacing.unit1o5 : Spacing.unit3o2, // Adjust height for open/closed
      duration: 300, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [ isPressed ]);

  return (
    <Animated.View style={{...styles.bigButtonContainer, height: animatedHeight }}>
      <View style={styles.addGameButton}>
        <View style={{
          ...styles.bigTopOfButton, 
          borderColor: isPressed ? Colors.orangeEdge : Colors.grayEdge 
        }}>
          <LinearGradient
            colors={isPressed 
              ? [Colors.orange, Colors.orangePrime]
              : [Colors.gray, Colors.grayPrime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.topGradient}
          >
            <View style={styles.iconContainer}>  
              <FontAwesome 
                size={FontSizes.large} 
                name={iconName} 
                color={Colors.white}
                style={styles.icon}
              />
              <Text style={styles.navButtonText}>{labelText}</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={{
          ...styles.bigBottomOfButton, 
          borderColor: isPressed ? Colors.orangeEdge : Colors.grayEdge,
        }}>
          <LinearGradient
            colors={isPressed 
              ? [Colors.orange, Colors.orangePrime]
              : [Colors.gray, Colors.grayPrime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bottomGradient}
          />
        </View>
      </View>
      <View style={styles.largeIndentation}/>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bigButtonContainer: {
    height: Spacing.unit3o2,
    width: Spacing.unit5,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: FontSizes.large,
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
    alignItems: 'center',
    gap: Spacing.unit1o5,
  },
  icon: {
    marginBottom: 2,
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
});