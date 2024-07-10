import { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { addGameAction } from "@/store/gameListReducer";
import { Colors, Fonts, FontSizes } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs'
import FontAwesome  from '@expo/vector-icons/FontAwesome';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './temp.css'

import {Calendar, LocaleConfig} from 'react-native-calendars';


export default function GameList() {
  // type DatePiece = Date | null;
  // type DateValue = DatePiece | [DatePiece, DatePiece];

  const [showForm, setShowForm] = useState(false)
  const [showCalendar, setShowCalendar]  = useState(false);
  const [date, setDate] = useState("Date Purchased")
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    hours: '',
    purchased: ''
  });

  function handlePlusPress() {
    setShowForm(true);
  }

  function openCalendar() {
    setShowCalendar(true)
  }

  function closeCalendar() {
    setShowCalendar(false)
  }

  function handleChange(field: string, value: string) {
    setFormData({...formData, [field]: field === 'hours' ? parseInt(value, 10) : value })
  }

  const handleSubmit = () => {
    if (formData.name && formData.hours && date != "Date Purchased") {
      let dateStr = date.toLocaleString().split(',')[0]

      dispatch(addGameAction({ name: formData.name, hours: parseInt(formData.hours, 10), purchased: dateStr }));
      setFormData({ name: '', hours: '', purchased: '' });
      setShowForm(false);
      closeCalendar();
    }
  };

  return (
    <>
      { showForm ?  (
        <View style={styles.gameForm}>
          <Text style={styles.addGameText}>Add a Game</Text>

          <TextInput
            placeholder="Title"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={formData.name} 
            onChangeText={(value) => handleChange('name', value)}
          />

          <TextInput 
            placeholder="Hours played"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={String(formData.hours)} 
            onChangeText={(value) => handleChange('hours', value)}
          />

          { showCalendar ? (
            <View style={styles.calendarContainer}>
              
              <Calendar 
                // headerStyle={styles.calendarHeader}
                theme={calendarTheme}
                onDayPress={day => {
                  setDate(day.dateString)

                }} 
                markedDates={{[date]: {selected: true, disableTouchEvent: true}}}
                maxDate={new Date().toISOString().split('T')[0]}
                minDate={'1970-01-01'}
              />

              <TouchableOpacity style={styles.calendarCloseBtn} onPress={closeCalendar}>
                <FontAwesome size={15} name="close" color={Colors.yellow} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.datePurchasedContainer}>

            <Text style={styles.datePurchasedText}>{date}</Text>
            <TouchableOpacity style={styles.calendarBtn} onPress={openCalendar}>
              <FontAwesome size={25} name="calendar" color={Colors.white} />
            </TouchableOpacity>

            </View>
          )}
          
          <TouchableOpacity style={styles.submitGameBtn} onPress={handleSubmit}>
            <Text style={styles.submitGameBtnText}>Submit Game Entry</Text>
          </TouchableOpacity>
        </View>
      )
       
      : (
        <TouchableOpacity style={styles.submitGameBtn} onPress={handlePlusPress}>
          <Text style={styles.submitGameBtnText}>+</Text>
        </TouchableOpacity>
      )
    }
    </>
  );
}

const styles = StyleSheet.create({
  gameForm: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: 2,
    borderRadius: 5
  },
  addGameText: {
    marginBottom: 5,
    color: Colors.yellow,
  },
  datePurchasedText: {
    margin: 5,
    color: Colors.gray,
    fontSize: FontSizes.mediumTwo,
  },
  input: {
    margin: 5,
    padding: 5,
    fontSize: FontSizes.mediumTwo,
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,
  },
  datePurchasedContainer: {
    margin: 5,
    padding: 2,
    fontSize: FontSizes.mediumTwo,
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,

    // display: 'flex',
    flexDirection: 'row',
    // alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.yellow,
    marginBottom: 5,
    borderWidth: 2,
    borderRadius: 5,
  },
  submitGameBtn: {
    // flex and position properties
    alignItems: 'center',

    // size properties
    // width: 200,

    // margin and padding properties
    padding: 10,

    // background properties
    backgroundColor: Colors.yellowPrime,

    // text/font properties
    // fontSize: FontSizes.medium

    // border properties
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,

    // effect properties

    // z-index and other
  },
  calendarCloseBtn: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  calendarBtn: {
    alignItems: 'center',

    // size properties

    // margin and padding properties
    // margin: 10,
    padding: 5,

    // background properties
    backgroundColor: Colors.yellowPrime,

    // text/font properties

    // border properties
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,

    // effect properties

    // z-index and other
  },
  submitGameBtnText: {
    fontSize: FontSizes.mediumTwo,
  }
});

const calendarTheme = {
  monthTextColor: Colors.yellow,
  backgroundColor: Colors.bluePrime,
  calendarBackground: Colors.bluePrime,
  
  selectedDayTextColor: Colors.white,
  todayTextColor: Colors.yellow,
  arrowColor: Colors.yellow,
  
  dotColor: Colors.yellow,
  indicatorColor: Colors.yellow,
  selectedDotColor: Colors.yellow,

  dayTextColor: Colors.white,
  textDisabledColor: Colors.black,

  textDayFontFamily: Fonts.monospace,
  textMonthFontFamily: Fonts.monospace,
  textDayHeaderFontFamily: Fonts.monospace,
}