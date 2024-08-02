import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, Fonts, FontSizes, Spacing } from '@/constants/Constants';
import { Text } from '../Customs';
import { GameListItem } from '@/store/gameReducer';
import { PlatformData } from '@/store/userReducer';

interface CustomDropdownProps {
  data: Array<PlatformData> | Array<GameListItem>;
  value: string | null;
  onChange: (item: PlatformData) => void;
  labelField: string;
  valueField: string;
  style?: object;
  renderItem?: (item: PlatformData) => React.ReactElement;
  renderLeftIcon?: (item: unknown) => React.ReactElement;
}

// export default function GameEntry({item, index, sortMode}: GameEntryProps) {
function TextDropdown({ data, value, onChange, labelField, valueField, style, renderItem, renderLeftIcon }: CustomDropdownProps ) {
  const defaultRenderItem = (item: GameListItem) => (
    <View>
      <Text style={styles.selectedText}>{item.name}</Text>
    </View>
  );

  const defaultRenderLeftIcon = () => (
    <View>
    </View>
  );

  return (
    <Dropdown
      data={data}
      labelField={labelField}
      valueField={valueField}
      value={value}
      fontFamily={Fonts.monospace}
      style={{...styles.topBar, ...style}}
      itemTextStyle={{ color: Colors.white }}
      itemContainerStyle={styles.itemContainer}
      selectedTextStyle={styles.selectedText}
      containerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      activeColor={Colors.blue}
      onChange={onChange}
      renderItem={renderItem || defaultRenderItem}
      renderLeftIcon={renderLeftIcon || defaultRenderLeftIcon}
      placeholder={''}
    />
  );
};

const styles = StyleSheet.create({
  topBar: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    color: Colors.white,
    minWidth: Spacing.unit7,
    maxWidth: Spacing.unit7 
  },
  container: {
    width: Spacing.unit7,
    padding: Spacing.unit1o5,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    backgroundColor: Colors.bluePrime
  },
  itemContainer: {
    borderColor: Colors.yellow,
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

export default CustomDropdown;