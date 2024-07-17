import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/Constants';
import { Calendar, DateData} from 'react-native-calendars';
import { Game } from '@/store/gameListReducer';
import ToggleCalendarBtn from './ToggleCalendarBtn';

interface CalendarProps {
  gameData: Game;
  setGameData: (data: unknown) => null;
  setShowCalendar: (data: unknown) => null;
}

export default function CustomCalendar({gameData, setGameData, setShowCalendar}: CalendarProps) {
  function closeCalendar() {
    setShowCalendar(false);
  }

  return (
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

      <ToggleCalendarBtn 
        styleType={'closeBtn'} 
        iconName='close' 
        pressFunction={closeCalendar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.unit1o5,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
  }
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