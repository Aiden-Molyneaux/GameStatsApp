import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from './Customs';
import { Colors, FontSizes, Spacing } from '../constants/Constants';

type ErrorDisplayProps = {
  errorMessage: string;
}

export default function ErrorDisplay({ errorMessage }: ErrorDisplayProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const animation = Animated.loop(blink);
    animation.start();

    return () => animation.stop();
  }, []);
  
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: Colors.red,
    fontSize: FontSizes.medium,
    textAlign: 'center',
  },
});
