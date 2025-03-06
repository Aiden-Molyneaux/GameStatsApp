import React, { useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '../../constants/Constants';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AuthModeButtonProps {
  type: string;
  authMode: string;
  setAuthMode: (mode: string) => void;
}

export default function AuthModeButton({ type, authMode, setAuthMode }: AuthModeButtonProps) {
  const label = type === 'joinUp' ? 'Join up' : 'Sign in';
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
    <Pressable style={styles.modeBtn} onPress={() => setAuthMode(type)}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <FontAwesome
          size={FontSizes.large} 
          name={'caret-right'} 
          color={authMode === type ? Colors.black : Colors.screenGray}
        />
      </Animated.View>
      <Text style={styles.modeBtnText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modeBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: Spacing.unit1o10
  },
  modeBtnText: {
    fontSize: FontSizes.large
  },
});
