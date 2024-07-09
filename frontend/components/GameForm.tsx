import { useState } from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { addGameAction } from "@/store/gameListReducer";
import { Colors, Fonts, FontSizes } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs'
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './temp.css'

import {Calendar, LocaleConfig} from 'react-native-calendars';


export default function GameList() {
  // type DatePiece = Date | null;
  // type DateValue = DatePiece | [DatePiece, DatePiece];

  const [showForm, setShowForm] = useState(false)
  const [date, setDate] = useState("")
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    hours: '',
    purchased: ''
  });

  function handlePlusPress() {
    setShowForm(true);
  }

  function handleChange(field: string, value: string) {
    setFormData({...formData, [field]: field === 'hours' ? parseInt(value, 10) : value })
  }

  const handleSubmit = () => {
    if (formData.name && formData.hours && date) {
      let dateStr = date.toLocaleString().split(',')[0]

      dispatch(addGameAction({ name: formData.name, hours: parseInt(formData.hours, 10), purchased: dateStr }));
      setFormData({ name: '', hours: '', purchased: '' });
      setShowForm(false);
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

          <View style={styles.calendar}>
            {/* <Calendar maxDate={new Date()} minDate={new Date("January 1, 70")} onChange={setDate} value={date}/> */}

            <Text>Date purchased</Text>

            <Calendar 
              // headerStyle={styles.calendarHeader}
              theme={calendarTheme}
              style={styles.calendar} 
              onDayPress={day => {setDate(day.dateString)}} markedDates={{[date]: {selected: true, disableTouchEvent: true}}}
            />
          </View>

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
  input: {
    margin: 5,
    padding: 5,
    fontSize: FontSizes.mediumTwo,
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,
  },
  calendar: {
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,
  },
  submitGameBtn: {
    // flex and position properties
    alignItems: 'center',

    // size properties
    // width: 200,

    // margin and padding properties
    marginTop: 10,
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