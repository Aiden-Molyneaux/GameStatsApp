import React from 'react';
import { FlatList } from 'react-native';
import GamerTagForm from './GamerTagForm';
import { GamerTag } from '@/store/userReducer';

interface GamerTagListProps {
  gamerTags: GamerTag[];
  handleTextInputChange: (field: string, value: string, index: number | null) => void;
  userData: any;
  setUserData: (data: any) => void;
  edit: boolean;
}

export default function GamerTagList({ gamerTags, handleTextInputChange, userData, setUserData, edit }: GamerTagListProps) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={gamerTags}
      renderItem={({ item, index }) => (
        <GamerTagForm
          item={item}
          index={index}
          edit={edit}
          handleTextInputChange={handleTextInputChange}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      keyExtractor={(gamerTag: GamerTag) => String(gamerTag.id)}
    />
  );
};