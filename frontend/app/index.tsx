import { Text, View, StyleSheet, Button, TextInput, FlatList, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { changeNameAction } from "@/store/userReducer";
import { addGameAction } from "@/store/gameListReducer";
import { useState } from "react";
import GameList from "@/components/GameList";
import { Colors } from '@/constants/Colors'

export default function Games() {
  const { username } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    hours: 0
  });

  function handleChange(field: string, value: string) {
    setFormData({...formData, [field]: field === 'hours' ? parseInt(value, 10) : value })
  }

  const handleSubmit = () => {
    if (formData.name && formData.hours) {
      dispatch(addGameAction({ name: formData.name, hours: formData.hours }));
      setFormData({ name: '', hours: 0 });
    }
  };

  // #212833 dark blue
  // #52637f light blue

  return (
    <View style={styles.gamePage}>
      <View>
        <GameList/>
      </View>

      <View>
        <Text>We are in the Games screen</Text>
        <Text>{username}</Text>
        <TextInput
          style={styles.input}
          value={formData.name} 
          onChangeText={(value) => handleChange('name', value)}
        />
        <TextInput 
          style={styles.input}
          value={String(formData.hours)} 
          onChangeText={(value) => handleChange('hours', value)}
        />
        <Button title='Submit Game Entry' onPress={handleSubmit}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gamePage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.dark.background
  },
  input: {
    margin: 5,
    borderWidth: 2,
    borderColor: 'red'
  }
});
