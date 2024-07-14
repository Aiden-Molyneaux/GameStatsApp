import { View, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs';
import ToggleModeBtn from './ToggleModeBtn';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { replaceGameAction, Game } from '@/store/gameListReducer';
import { Calendar, DateData} from 'react-native-calendars';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GameEntryFormProps {
  gameData: Game;
  setGameData: (data: unknown) => null;
}

export default function GameEntryForm({gameData, setGameData}: GameEntryFormProps) {
  const dispatch = useDispatch();
  
  const [showCalendar, setShowCalendar]  = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  useEffect(() => {
    setDisableSaveBtn(!(gameData.name && gameData.hours && gameData.purchased));
  }, [gameData]);

  function openCalendar() {
    setShowCalendar(true);
  }

  function closeCalendar() {
    setShowCalendar(false);
  }

  function saveGameEntry() {
    if (gameData.name && gameData.hours && gameData.purchased) {
      const replacementGame: Game = {
        id: gameData.id,
        name: gameData.name,
        hours: gameData.hours,
        purchased: gameData.purchased,
        mode: VIEW
      };

      setGameData({...gameData, mode: VIEW});
      dispatch(replaceGameAction({id: gameData.id, game: replacementGame}));
    }
  }

  function handleTextInputChange(field: string, value: string) {
    setGameData({...gameData, [field]: field === 'hours' ? parseInt(value.replace(/[^0-9]/g, ''), 10) : value });
  }

  return (
    <View style={styles.gameEntryForm}>
      <Text style={styles.addGameText}>
        {gameData.mode === EDIT ? 'Edit Game Entry' : 'New Game Entry'}
      </Text>

      <ToggleModeBtn name='save' isDisabled={disableSaveBtn} submitFunction={saveGameEntry}/>

      <TextInput
        placeholder='Title'
        placeholderTextColor={Colors.gray}
        style={styles.input}
        value={gameData.name} 
        onChangeText={(value) => handleTextInputChange('name', value)}
      />

      <TextInput 
        placeholder='Hours played'
        placeholderTextColor={Colors.gray}
        style={styles.input}
        value={String(gameData.hours)} 
        onChangeText={(value) => handleTextInputChange('hours', value)}
        keyboardType='numeric'
      />

      { showCalendar ? (
        <View style={styles.calendarContainer}>
          
          <Calendar 
            theme={calendarTheme}
            onDayPress={(day: DateData) => {
              setGameData({...gameData, purchased: day.dateString});
              setShowCalendar(false);
            }} 
            markedDates={{[gameData.purchased]: {selected: true, disableTouchEvent: true}}}
            maxDate={new Date().toISOString().split('T')[0]}
            minDate={'1970-01-01'}
          />

          <Pressable style={styles.calendarCloseBtn} onPress={closeCalendar}>
            <FontAwesome size={FontSizes.medium} name='close' color={Colors.yellow} />
          </Pressable>

        </View>
      ) : (
        <View style={styles.datePurchasedContainer}>

          <Text style={
            (/^\d{4}-\d{2}-\d{2}$/.test(gameData.purchased)) 
              ? {...styles.datePurchasedText, color: Colors.white}
              : {...styles.datePurchasedText, color: Colors.gray}
          }
          >{gameData.purchased}</Text>

          <Pressable style={styles.calendarBtn} onPress={openCalendar}>
            <FontAwesome size={FontSizes.medium} name='calendar' color={Colors.white} />
          </Pressable>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameEntry: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o2,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5
  },
  gameIndex: {
    position: 'absolute',
    top: Spacing.unit1o5,
    left: Spacing.unit1o5,
    color: Colors.yellow,
    fontSize: FontSizes.small,
  },
  gameText: {
    color: Colors.yellow,
  },
  hourText: {
    fontSize: FontSizes.mediumLess,
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  gameEntryForm: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o3,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5
  },
  addGameText: {
    marginBottom: Spacing.unit1o5,
    color: Colors.yellow,
  },
  editBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  },
  datePurchasedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  datePurchasedText: {
    margin: Spacing.unit1o5,
    color: Colors.gray,
    fontSize: FontSizes.mediumLess,
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.unit1o5,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  },
  calendarCloseBtn: {
    position: 'absolute',
    top: Spacing.unit1o5,
    right: Spacing.unit1o5,
  },
  calendarBtn: {
    alignItems: 'center',
    // size properties
    // margin and padding properties
    padding: Spacing.unit1o5,
    // background properties
    backgroundColor: Colors.yellowPrime,
    // text/font properties
    // border properties
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    // effect properties
    // z-index and other
  },
});

const calendarTheme = {
  monthTextColor: Colors.yellow,
  backgroundColor: Colors.bluePrime,
  calendarBackground: Colors.bluePrime,
  
  selectedDayTextColor: Colors.white,
  todayTextColor: Colors.yellow,
  arrowColor: Colors.yellow,
  
  // dotColor: Colors.yellow,
  indicatorColor: Colors.yellow,
  // selectedDotColor: Colors.yellow,

  dayTextColor: Colors.white,
  textDisabledColor: Colors.black,

  textDayFontFamily: Fonts.monospace,
  textMonthFontFamily: Fonts.monospace,
  textDayHeaderFontFamily: Fonts.monospace,
};