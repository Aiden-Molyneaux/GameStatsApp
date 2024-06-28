import { Text, View, StyleSheet, Button, TextInput, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';

export default function GameList() {
  const { games } = useSelector((state: RootState) => state.gameListData);

  interface Game {
    name: string,
    hours: number
  }

  const renderItem = ({ item } : { item: Game}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.hours} hours</Text>
    </View>
  );

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    borderWidth: 2,
    borderColor: 'red'
  }
});
