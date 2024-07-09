import { View, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { Text } from "./Customs";
import { Colors, FontSizes } from '@/constants/Constants';

export default function GameList() {
  const { games } = useSelector((state: RootState) => state.gameListData);

  interface Game {
    name: string,
    hours: number,
    purchased: string,
  }

  const renderItem = ({ item, index} : { item: Game; index: number}) => (
    <View style={styles.gameEntry}>
      <Text style={styles.gameIndex}>{index + 1}</Text>
      <Text style={styles.gameText}>{item.name}</Text>
      <Text style={styles.hourText}>{item.hours} hours</Text>
      <Text style={styles.hourText}>Owned since {item.purchased}</Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.gameListText}>Your Play-Time</Text>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
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
  gameListText: {
    color: Colors.yellow,
    fontSize: FontSizes.large,
    textAlign: 'center'
  },
  gameText: {
    color: Colors.yellow,
    textAlign: 'center'
  },
  hourText: {
    color: Colors.white,
    fontSize: FontSizes.mediumTwo,
    textAlign: 'center'
  }
});
