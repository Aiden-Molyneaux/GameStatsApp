import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text } from '../Customs';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import ProfileEntry from './ProfileEntry';

export default function ProfileList() {

  return (
    <View style={styles.gameListContainer}>
      <Text style={styles.gameListText}>Your Profile</Text>
    
      <ProfileEntry/>

    </View>
  );
}

const styles = StyleSheet.create({
  filterByText: {
    paddingBottom: 3, 
    color: Colors.yellowPrime,
    fontSize: FontSizes.small,
    borderBottomWidth: Spacing.border / 2,
    borderColor: Colors.yellowPrime
  },
  gameListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sortBtnContainer: {
    flexDirection: 'row'
  },
  gameListText: {
    marginBottom: Spacing.unit1o5,
    color: Colors.yellow,
    fontSize: FontSizes.large,
  },
  sortBtn: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // width: Spacing.unit,
    height: Spacing.unit1o2 + 8,
    margin: Spacing.unit1o5,

    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 5,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 5
  },
  sortByText: {
    fontSize: FontSizes.small,
  },
  submitGameBtn: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: Spacing.unit,
    height: Spacing.unit + 10,
    margin: Spacing.unit1o3,
    backgroundColor: Colors.yellowPrime,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderTopWidth: 10,
    borderRadius: Spacing.unit1o5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  submitHovered: {
    height: Spacing.unit
  },
});
