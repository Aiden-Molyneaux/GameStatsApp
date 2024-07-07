import { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { addGameAction } from "@/store/gameListReducer";
import { Colors, Fonts, FontSizes } from '@/constants/Constants';

export default function GameList() {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    hours: '',
    period: ''
  });

  function handlePlusPress() {
    setShowForm(true);
  }

  function handleChange(field: string, value: string) {
    setFormData({...formData, [field]: field === 'hours' || field === 'period' ? parseInt(value, 10) : value })
  }

  const handleSubmit = () => {
    if (formData.name && formData.hours && formData.period) {
      dispatch(addGameAction({ name: formData.name, hours: formData.hours, period: formData.period }));
      setFormData({ name: '', hours: '', period: '' });
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
          <TextInput
            placeholder="Duration owned"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            value={String(formData.period)} 
            onChangeText={(value) => handleChange('period', value)}
          />
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
    alignItems: 'flex-start'
  },
  addGameText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
    textAlign: 'center'
  },
  input: {
    margin: 5,
    color: Colors.white,
    borderWidth: 2,
    borderColor: Colors.yellow,
    borderRadius: 5,
  },
  submitGameBtn: {
    backgroundColor: Colors.yellowPrime,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: Colors.yellow,
  },
  submitGameBtnText: {
    color: Colors.white,
    fontSize: FontSizes.medium,
  }
});