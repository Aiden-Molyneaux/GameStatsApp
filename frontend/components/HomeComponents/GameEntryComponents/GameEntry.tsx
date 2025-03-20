import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GameListItem } from '@/store/gameReducer';
import { Colors, Spacing } from '@/constants/Constants';
import GameEntryForm from './GameEntryForm';
import Index from './Index';
import TitleCard from './TitleCard';
import StaticDetails from './StaticDetails';
import ModeButtons from './ModeButtons';
import TitleInput from './TitleInput';

interface GameEntryProps {
  item: GameListItem,
  index: number
}

export default function GameEntry({ item, index }: GameEntryProps) {
  // Single source of truth for all form data
  const [formData, setFormData] = useState({
    // index: index
    ...item,
    tempTitle: item.name,
    tempTitleColour: item.titleColour,
    tempHeaderColour: item.headerColour
  });

  // Reset form data when item changes
  useEffect(() => {
    setFormData({
      ...item,
      tempTitle: item.name,
      tempTitleColour: item.titleColour,
      tempHeaderColour: item.headerColour
    });
  }, [item]);

  useEffect(() => {
    setViewMode(item.mode || 'CLOSED');
  }, [item.mode]);

  const [viewMode, setViewMode] = useState(item.mode || 'CLOSED');
  
  // Handle form field changes
  const handleFormChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Handle color changes from color picker
  const handleColorChange = (headerColour: string, titleColour: string) => {
    setFormData({
      ...formData,
      tempHeaderColour: headerColour,
      tempTitleColour: titleColour
    });
  };
  
  // Reset form data when closing form
  const handleCloseForm = () => {
    setFormData({
      ...formData,
      tempTitle: formData.name,
      tempTitleColour: formData.titleColour,
      tempHeaderColour: formData.headerColour
    });
    setViewMode('CLOSED');
  };

  return (
    <View style={styles.gameEntryContainer}>
      <Index index={index}/>
      <View style={styles.gameEntry}>
        { viewMode !== 'EDIT' 
          ? <TitleCard 
            name={formData.name}
            headerColour={formData.headerColour}
            titleColour={formData.titleColour}
          />
          : <View style={styles.gameEntryHeader}>
            <TitleInput
              name={formData.tempTitle || formData.name}
              tempHeaderColour={formData.tempHeaderColour}
              tempTitleColour={formData.tempTitleColour}
              handleTextInputChange={(value) => handleFormChange('tempTitle', value)}
            />
            <View style={styles.spacer}/>
          </View>
        }

        { viewMode !== 'EDIT' &&
          <StaticDetails 
            gameData={formData}
            viewMode={viewMode}
          />
        }
        
        <GameEntryForm
          formData={formData}
          onFormChange={handleFormChange}
          onColorChange={handleColorChange}
          onFormClose={handleCloseForm}
          viewMode={viewMode}
        />
      </View>
      
      { viewMode !== 'EDIT'
        ? <ModeButtons 
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  gameEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderTopWidth: Spacing.border
  },
  gameEntry: {
    flex: 1,
    marginVertical: Spacing.unit1o5,
    zIndex: 1,
  },
  gameEntryHeader: {
    flexDirection: 'row',
  },
  spacer: {
    width: Spacing.unit2,
  }
});