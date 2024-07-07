import { Text, View, StyleSheet, Button, TextInput, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { Colors, Fonts, FontSizes } from '@/constants/Constants';

export default function GameList() {
  const { games } = useSelector((state: RootState) => state.gameListData);

  interface Game {
    name: string,
    hours: number,
    period: number
  }

  const renderItem = ({ item } : { item: Game}) => (
    <View style={styles.gameEntry}>
      <Text style={styles.gameText}>{item.name}</Text>
      <Text style={styles.hourText}>{item.hours} hours</Text>
      <Text style={styles.hourText}>over {item.period} years</Text>
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
  gameListText: {
    color: Colors.yellow,
    fontSize: FontSizes.large,
    fontFamily: Fonts.monospace,
    textAlign: 'center'
  },
  gameText: {
    color: Colors.yellow,
    fontSize: FontSizes.medium,
    fontFamily: Fonts.monospace,
    textAlign: 'center'
  },
  hourText: {
    color: Colors.white,
    fontSize: FontSizes.mediumTwo,
    fontFamily: Fonts.monospace,
    textAlign: 'center'
  }
});
