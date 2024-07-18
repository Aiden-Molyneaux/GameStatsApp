import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, Fonts, FontSizes, Spacing } from '@/constants/Constants';
import { Text } from '../Customs';
import { Game } from '@/store/gameListReducer';
import { PlatformData } from '@/store/userReducer';

interface CustomDropdownProps {
  data: Array<PlatformData>;
  value: string | null;
  onChange: (item: PlatformData) => void;
  selectedLogo: React.JSX.Element;
}

// export default function GameEntry({item, index, sortMode}: GameEntryProps) {
function SymbolDropdown({ data, value, onChange, selectedLogo }: CustomDropdownProps ) {
  
  const renderItem = (item: PlatformData) => {
    return ( <View>{item.logo}</View> );
  };

  const defaultRenderLeftIcon = () => ( <View style={styles.selectedLogo}>{selectedLogo}</View> );

  return (
    <Dropdown
      data={data}
      labelField={'platform'}
      valueField={'platform'}
      value={value}
      fontFamily={Fonts.monospace}
      style={styles.topBar}
      itemContainerStyle={styles.itemContainer}
      selectedTextStyle={styles.selectedText}
      containerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      activeColor={Colors.blue}
      onChange={onChange}
      renderItem={renderItem}
      renderLeftIcon={defaultRenderLeftIcon}
      placeholder={''}
    />
  );
};

const styles = StyleSheet.create({
  topBar: {
    marginVertical: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    color: Colors.white,
    minWidth: Spacing.unit3o2
  },
  container: {
    minWidth: Spacing.unit3o2,
    padding: Spacing.unit1o5,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    backgroundColor: Colors.bluePrime
  },
  itemContainer: {
    alignItems: 'flex-end',
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    margin: 1, 
    padding: 5,
  },
  selectedText: {
    fontSize: 0,
  },
  selectedLogo: {
    position: 'absolute',
    right: Spacing.unit1o2
  },
});

export default SymbolDropdown;