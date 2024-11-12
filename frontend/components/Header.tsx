import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Customs'; 
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.hmm}> </Text>
      <Text style={styles.headerText}>n-Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    margin: Spacing.unit1o2,
    marginLeft: Spacing.unit3o2,
    marginBottom: Spacing.unit1o5
  },
  headerText: {
    paddingLeft: 5,
    borderWidth: 5,
    borderColor: Colors.plum,
    borderRightWidth: 0,
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: Colors.plum,
    fontSize: FontSizes.header,
    fontWeight: 'bold',
    // fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: 3,
    lineHeight: 30
    // textShadow: `${Colors.orange} 1px 1px 4px`,
    // borderWidth: Spacing.borderThick,
    // borderColor: Colors.red, 
    // borderRadius: 15,
    // borderBottomWidth: 0,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0
  },
  hmm: {
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: Colors.plum
  }
});