import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, Fonts, FontSizes, Spacing } from '@/constants/Constants';

interface CustomDropdownProps {
  data: Array<{label: string; value: string}>;
  value: string | null;
  onChange: (item: {label: string; value: string}) => void;
}

// export default function GameEntry({item, index, sortMode}: GameEntryProps) {
function TextDropdown({ data, value, onChange }: CustomDropdownProps ) {

  return (
    <Dropdown
      data={data}
      labelField={'label'}
      valueField={'value'}
      value={value}
      fontFamily={Fonts.monospace}
      style={styles.topBar}
      itemTextStyle={{ color: Colors.white }}
      itemContainerStyle={styles.itemContainer}
      selectedTextStyle={styles.selectedText}
      containerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      activeColor={Colors.gray}
      onChange={onChange}
    />
  );
};

const styles = StyleSheet.create({
  topBar: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    color: Colors.white,
    minWidth: Spacing.unit7,
    maxWidth: Spacing.unit7 
  },
  container: {
    width: Spacing.unit7,
    padding: Spacing.unit1o5,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    backgroundColor: Colors.black
  },
  itemContainer: {
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    margin: 1, 
    padding: 0 
  },
  selectedText: { 
    color: Colors.white, 
    fontSize: FontSizes.mediumLess,
  }
});

export default TextDropdown;