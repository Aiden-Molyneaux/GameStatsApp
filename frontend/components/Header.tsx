import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from './Customs'; 
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/images/headerText.png')}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.headerSubText}>The Root of Your Passion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '95%',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    height: Spacing.unit3o2, // Adjust this value to match your image height needs
    marginLeft: -Spacing.unit * 5,
  },
  logo: {
    width: '100%',
    height: '100%',

  },
  headerSubText: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.unit1o10,
    color: Colors.grayPrime,
    fontWeight: 'bold',
    letterSpacing: 1
  },
});