import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Customs'; 
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.hmm}>   </Text>
        <Text style={styles.headerText}>n-Game</Text>
      </View>
      <Text style={styles.headerSubText}>The Root of Your Passion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    marginLeft: Spacing.unit,
  },
  header: {
    flexDirection: 'row',
  },
  headerText: {
    paddingLeft: 5,
    borderWidth: 5,
    borderColor: Colors.appTitlePurple,
    borderRightWidth: 0,
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: Colors.appTitlePurple,
    fontSize: FontSizes.header,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  headerSubText: {
    alignSelf: 'flex-start',
    marginVertical: Spacing.unit1o10,
    color: Colors.grayPrime,
    fontWeight: 'bold',
  },
  hmm: {
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: Colors.appTitlePurple
  }
});