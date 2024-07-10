import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Colors, FontSizes, Fonts } from '@/constants/Constants';
import { Text, TextInput} from '@/components/Customs'
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { replaceGameAction, Game } from "@/store/gameListReducer";
import {Calendar, } from 'react-native-calendars';

const VIEW = 'VIEW';
const EDIT = 'EDIT';
const NEW = 'NEW';

interface GameEntryProps {
  item: Game,
  index: number,
}

export default function GameEntry({item, index}: GameEntryProps) {
  const [showCalendar, setShowCalendar]  = useState(false);
  
  const dispatch = useDispatch()

  const [ gameData, setGameData] = useState({
    index: index,
    name: item.name,
    hours: item.hours,
    purchased: item.purchased,
    mode: item.mode
  });

  function openCalendar() {
    setShowCalendar(true)
  }

  function closeCalendar() {
    setShowCalendar(false)
  }

  function setModeEdit() {
    setGameData({...gameData, mode: EDIT})
  }

  function saveGameEntry() {
    if (gameData.name && gameData.hours && gameData.purchased) {
      let replacementGame: Game = {
        name: gameData.name,
        hours: gameData.hours,
        purchased: gameData.purchased,
        mode: VIEW
      }

      setGameData({...gameData, mode: VIEW})
      dispatch(replaceGameAction({index: gameData.index, game: replacementGame}))
    }
  }

  function handleTextInputChange(field: string, value: string) {
    setGameData({...gameData, [field]: field === 'hours' ? parseInt(value, 10) : value })
  }


  return (gameData.mode === VIEW) ? (

    <View style={styles.gameEntry}>

      <TouchableOpacity style={styles.editBtn} onPress={setModeEdit}>
        <FontAwesome size={15} name="edit" color={Colors.yellow} />
      </TouchableOpacity>

      <Text style={styles.gameIndex}>{gameData.index + 1}</Text>
      <Text style={styles.gameText}>{gameData.name}</Text>
      <Text style={styles.hourText}>{gameData.hours} hours</Text>
      <Text style={styles.hourText}>Owned since {gameData.purchased}</Text>

    </View>
    
  ) : (
    <View style={styles.gameForm}>

      <Text style={styles.addGameText}>
        {gameData.mode === EDIT ? 'Edit Game Entry' : 'Add Game Entry'}
      </Text>

      <TouchableOpacity style={styles.editBtn} onPress={saveGameEntry}>
        <FontAwesome size={15} name="save" color={Colors.yellow} />
      </TouchableOpacity>

      <TextInput
        placeholder="Title"
        placeholderTextColor={Colors.gray}
        style={styles.input}
        value={gameData.name} 
        onChangeText={(value) => handleTextInputChange('name', value)}
      />

      <TextInput 
        placeholder="Hours played"
        placeholderTextColor={Colors.gray}
        style={styles.input}
        value={String(gameData.hours)} 
        onChangeText={(value) => handleTextInputChange('hours', value)}
      />

      { showCalendar ? (
        <View style={styles.calendarContainer}>
          
          <Calendar 
            theme={calendarTheme}
            onDayPress={day => {
              gameData.purchased = day.dateString
            }} 
            markedDates={{[gameData.purchased]: {selected: true, disableTouchEvent: true}}}
            maxDate={new Date().toISOString().split('T')[0]}
            minDate={'1970-01-01'}
          />

          <TouchableOpacity style={styles.calendarCloseBtn} onPress={closeCalendar}>
            <FontAwesome size={15} name="close" color={Colors.yellow} />
          </TouchableOpacity>

        </View>
      ) : (
        <View style={styles.datePurchasedContainer}>

          <Text style={styles.datePurchasedText}>{gameData.purchased}</Text>

          <TouchableOpacity style={styles.calendarBtn} onPress={openCalendar}>
            <FontAwesome size={25} name="calendar" color={Colors.white} />
          </TouchableOpacity>

        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  gameEntry: {
    margin: 2,
    padding: "0.5em",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: 2,
    borderRadius: 10
    // borderRadius: "2px",
  },
  gameIndex: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: Colors.yellow,
    fontSize: FontSizes.small,
  },
  gameText: {
    color: Colors.yellow,
    textAlign: 'center'
  },
  hourText: {
    color: Colors.white,
    fontSize: FontSizes.mediumTwo,
    textAlign: 'center'
  },
  input: {
    margin: 5,
    padding: 5,
    fontSize: FontSizes.mediumTwo,
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,
  },
  gameForm: {
    margin: 2,
    padding: "0.5em",
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: 2,
    borderRadius: 10
  },
  addGameText: {
    marginBottom: 5,
    color: Colors.yellow,
  },
  editBtn: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  datePurchasedContainer: {
    margin: 5,
    padding: 2,
    fontSize: FontSizes.mediumTwo,
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePurchasedText: {
    margin: 5,
    color: Colors.gray,
    fontSize: FontSizes.mediumTwo,
  },
  calendarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.yellow,
    marginBottom: 5,
    borderWidth: 2,
    borderRadius: 5,
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

})

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