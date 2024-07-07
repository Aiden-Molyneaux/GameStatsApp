import { Text, View, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { changeNameAction } from "@/store/userReducer";
import { Colors, Fonts, FontSizes } from '@/constants/Constants';

export default function Profile() {
  const { username } = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();

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
    fontFamily: Fonts.monospace,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: Colors.yellowPrime,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  }
});