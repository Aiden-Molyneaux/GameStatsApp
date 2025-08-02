import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { GameListItem } from '@/store/gameReducer';
import GameList from '@/components/HomeComponents/GameList';
import { Text } from '@/components/Customs';
import SortBar from '@/components/SortButtons';
import AddGameBtn from '@/components/HomeComponents/AddGameBtn';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import { logout } from '@/store/authReducer';
import { useDispatch } from 'react-redux';
import ToggleModeBtn from '@/components/ToggleModeBtn';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function LogoutButton() {
  const dispatch = useDispatch();

  return (
    <Pressable style={styles.logoutBtn} onPress={() => dispatch(logout())}>
      <Text style={styles.logoutText}>Logout</Text>
      <View style={styles.logoutIcon}>
        <FontAwesome
          size={FontSizes.large} 
          name={'sign-out'} 
          color={Colors.black}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    margin: 5,
    justifyContent: 'center',
  },
  logoutText: {
    alignSelf: 'center',
  },
});
