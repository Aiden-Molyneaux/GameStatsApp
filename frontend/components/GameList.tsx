import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../store/store';
import { Text } from "./Customs";
import { Colors, FontSizes } from '@/constants/Constants';
import GameEntry from "./GameEntry";
import { replaceGameAction, Game, addGameAction } from "@/store/gameListReducer";

import FontAwesome  from '@expo/vector-icons/FontAwesome';

export default function GameList() {
  const { games } = useSelector((state: RootState) => state.gameListData);
  const dispatch = useDispatch()

  function handlePlusPress() {
    dispatch(addGameAction({ name: "", hours: "", purchased: "Date Purchased", mode: "NEW" }))
  }

  const renderItem = ({ item, index} : { item: Game; index: number}) => (    
    <GameEntry item={item} index={index}></GameEntry>
  );

  return (
    <View style={styles.gameListContainer}>
      <Text style={styles.gameListText}>Your Play-Time</Text>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />

      <TouchableOpacity style={styles.submitGameBtn} onPress={handlePlusPress}>
        <FontAwesome size={25} name="plus" color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gameListContainer: {
    alignItems: 'center'
  },
  gameListText: {
    color: Colors.yellow,
    fontSize: FontSizes.large,
    textAlign: 'center'
  },
  submitGameBtn: {
    // flex and position properties
    alignItems: 'center',
    justifyContent: 'space-evenly',

    // size properties
    width: 50,
    height: 50,

    // margin and padding properties
    // padding: 10,

    // background properties
    backgroundColor: Colors.yellowPrime,

    // text/font properties
    // fontSize: FontSizes.medium

    // border properties
    borderColor: Colors.yellow,
    borderWidth: 2,
    borderRadius: 5,

    // effect properties

    // z-index and other
  },
});
