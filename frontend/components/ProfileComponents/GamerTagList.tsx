import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import GamerTagForm from './GamerTagForm';
import { GamerTag } from '../../../backend/models/gamerTagModel';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';

interface GamerTagListProps {
  gamerTags: GamerTag[];
  handleTextInputChange: (field: string, value: string, index: number | null) => void;
  edit: boolean;
}

export default function GamerTagList({ gamerTags, handleTextInputChange, edit }: GamerTagListProps) {

  console.log({gamerTags});
  const renderItem = ({ item, index } : { item: GamerTag; index: number}) => (
    <GamerTagForm key={item.id} gamerTagData={item} index={index} edit={edit} handleTextInputChange={handleTextInputChange}/>
  );

  return (
    <FlatList
      style={styles.gamerTagList}
      showsVerticalScrollIndicator={false}
      data={gamerTags}
      renderItem={renderItem}
      keyExtractor={(gamerTag: GamerTag) => String(gamerTag.id)}
    />
  );
};

const styles = StyleSheet.create({
  gamerTagList: {
    margin: Spacing.unit1o5,
  }
});