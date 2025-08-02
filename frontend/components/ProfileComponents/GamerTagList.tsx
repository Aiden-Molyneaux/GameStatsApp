import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { GamerTag } from '../../../backend/models/gamerTagModel';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import GamerTagEntry from './GamerTagEntry';
import { GamerTagListItem } from '@/store/gamerTagReducer';

interface GamerTagListProps {
  gamerTags: GamerTagListItem[];
}

export default function GamerTagList({ gamerTags }: GamerTagListProps) {
  const renderItem = ({ item, index } : { item: GamerTagListItem; index: number}) => (
    <GamerTagEntry key={item.id} gamerTag={item} index={index}/>
  );

  return (
    <FlatList
      style={styles.gamerTagList}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={gamerTags}
      renderItem={renderItem}
      keyExtractor={(gamerTag: GamerTagListItem) => String(gamerTag.id)}
    />
  );
};

const styles = StyleSheet.create({
  gamerTagList: {
    margin: Spacing.unit1o5,
    
    width: '100%',

  },
  // contentContainer: {
  //   justifyContent: 'flex-start'
  // }
});