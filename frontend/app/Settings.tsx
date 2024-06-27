import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { changeNameAction } from "@/store/counterReducer";

export default function Settings() {
  const { username } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>We are in the settings screen</Text>
      <Text>{username}</Text>
      <Button title='change' onPress={() => dispatch(changeNameAction('Kyra'))}/>
    </View>
  );
}