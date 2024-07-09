import { View, StyleSheet, Button } from "react-native";
import { Text } from "./Customs"; 
import { Colors, FontSizes } from '@/constants/Constants';

export default function Header() {
  return (
    <View>
      <Text style={styles.headerText}>In-Game</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    margin: 10,
    color: Colors.yellow,
    fontSize: FontSizes.header,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: Colors.yellowPrime,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  }
});