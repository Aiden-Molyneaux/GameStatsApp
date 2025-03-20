import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';

interface TitleCardProps {
  name: string,
  headerColour: string,
  titleColour: string
}

export default function TitleCard({ name, headerColour, titleColour }: TitleCardProps) {
  return (
    <View style={{...styles.gameHeader, backgroundColor: headerColour }}>
      <Text style={{...styles.titleText, color: titleColour}}>{name}</Text>
    </View> 
  );};

const styles = StyleSheet.create({
  gameHeader: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.unit1o5,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: 10,
  },
  titleText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.larger,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3
  },
});