import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Spacing } from '@/constants/Constants';
import { GameListItem } from '@/store/gameReducer';
import StatisticInputs from './StatisticInputs';
import ColourInputs from './ColourInputs';
import FormButtons from './FormButtons';
import ErrorDisplay from '@/components/ErrorDisplay';

interface GameEntryFormProps {
  formData: GameListItem & { 
    tempTitle?: string,
    tempTitleColour: string, 
    tempHeaderColour: string 
  },
  onFormChange: (field: string, value: any) => void,
  onColorChange: (headerColour: string, titleColour: string) => void,
  onFormClose: () => void,
  viewMode: string
}

export default function GameEntryForm({ 
  formData, 
  onFormChange, 
  onColorChange, 
  onFormClose,
  viewMode 
}: GameEntryFormProps) {
  const [isColorValid, setIsColorValid] = useState(true);
  const [showTitleColourPicker, setShowTitleColourPicker] = useState(false);
  const [showHeaderColourPicker, setShowHeaderColourPicker] = useState(false);
  
  // Reset pickers when form closes
  useEffect(() => {
    if (viewMode !== 'EDIT') {
      setShowTitleColourPicker(false);
      setShowHeaderColourPicker(false);
    }
  }, [viewMode]);
  
  // Calculate height for animation
  const expandedHeight = showTitleColourPicker || showHeaderColourPicker ? Spacing.unit2 * 5.5 : Spacing.unit2 * 2.8;
  
  // Animation values
  const animatedHeight = useRef(new Animated.Value(viewMode === 'EDIT' ? expandedHeight : 0)).current;
  const animatedOpacity = useRef(new Animated.Value(viewMode === 'EDIT' ? 1 : 0)).current;

  // Animation effect
  useEffect(() => {
    const isOpen = viewMode === 'EDIT';
    
    const heightAnimation = Animated.timing(animatedHeight, {
      toValue: isOpen ? expandedHeight : 0,
      duration: 500,
      useNativeDriver: false,
    });
    
    const opacityAnimation = Animated.timing(animatedOpacity, {
      toValue: isOpen ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    });
        
    Animated.parallel([heightAnimation, opacityAnimation]).start();
  }, [viewMode, expandedHeight]);

  function handleTextInputChange(field: string, value: string) {
    onFormChange(field, field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value);
  }

  function setColourData(headerColour: string, titleColour: string) {
    onColorChange(headerColour, titleColour);
  }

  const [formError, setFormError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleFormError(errorMessage: string) {
    console.error(errorMessage);
    setFormError(true);
    setErrorMessage(errorMessage);
  }

  function resetFormError() {
    setFormError(false);
    setErrorMessage('');
  }

  return (
    <Animated.View 
      style={{
        height: animatedHeight, 
        opacity: animatedOpacity,
        overflow: 'hidden',
      }}
    >  
      <View style={styles.gameEntryContainer}>
        <View style={styles.gameEntry}>
          <ColourInputs
            tempHeaderColour={formData.tempHeaderColour}
            tempTitleColour={formData.tempTitleColour}
            setColourData={setColourData}
            isColorValid={isColorValid}
            setIsColorValid={setIsColorValid}
            showTitleColourPicker={showTitleColourPicker}
            showHeaderColourPicker={showHeaderColourPicker}
            setShowTitleColourPicker={setShowTitleColourPicker}
            setShowHeaderColourPicker={setShowHeaderColourPicker}
          />

          <StatisticInputs
            formData={formData}
            handleTextInputChange={handleTextInputChange}
          />

          <View style={styles.errorContainer}>
            {formError && <ErrorDisplay errorMessage={errorMessage} />}
          </View>
        </View>
        { viewMode === 'EDIT' &&
          <FormButtons
            formData={formData}
            onFormClose={onFormClose}
            isColorValid={isColorValid}
            handleFormError={handleFormError}
            resetFormError={resetFormError}
          />
        }

      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gameEntryContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  gameEntry: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.unit1o5
  },
  errorContainer: {
    height: Spacing.unit,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
