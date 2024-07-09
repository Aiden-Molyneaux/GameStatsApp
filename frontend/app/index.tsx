import { View, StyleSheet, Platform } from "react-native";
import GameList from "@/components/GameList";
import GameForm from "@/components/GameForm";
import { Colors } from '@/constants/Constants'

export default function Games() {
  return (
    <View style={styles.gamePage}>
      <GameList/>
      <GameForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  gamePage: {
    paddingTop: Platform.OS === "ios" ? 0 : 60,
    height: '100%',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    color: Colors.yellow
  }
});
