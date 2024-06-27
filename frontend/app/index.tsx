import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { changeNameAction } from "@/store/counterReducer";

export default function Home() {
  const {username} = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>We are in the homescreen</Text>
      <Text>{username}</Text>
      <Button title='-' onPress={() => dispatch(changeNameAction('Patrick'))}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
