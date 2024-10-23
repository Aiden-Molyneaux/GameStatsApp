import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { GameListItem, updateGameAction } from '@/store/gameReducer';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import GameEntryForm from './GameEntryForm';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GameEntryProps {
  item: GameListItem,
  index: number,
  sortMode: string
}

export default function GameEntry({ item, index, sortMode }: GameEntryProps) {
  const dispatch = useDispatch();
  
  const [ gameData, setGameData] = useState({
    id: item.id,
    index: index,
    name: item.name,
    hours: item.hours,
    datePurchased: item.datePurchased,
    mode: item.mode
  });

  const [ viewMode, setViewMode ] = useState('CLOSED');
  const [isModalVisible, setIsModalVisible] = useState(item.mode === 'NEW');

  const animatedHeight = useRef(new Animated.Value(viewMode === 'OPEN' ? 150 : 0)).current;

  function setModeEdit() {
    const updatedGame: GameListItem = {
      id: gameData.id,
      name: gameData.name,
      hours: gameData.hours,
      datePurchased: gameData.datePurchased,
      mode: EDIT
    };

    setGameData({...gameData, mode: EDIT});
    dispatch(updateGameAction({ game: updatedGame }));
    setIsModalVisible(true);
  }

  function changeViewMode() {
    setViewMode(viewMode === 'OPEN' ? 'CLOSED' : 'OPEN');
  }

  // UseEffect to animate the height when viewMode changes
  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: viewMode === 'OPEN' ? 60 : 0, // Adjust height for open/closed
      duration: 500, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [viewMode]);

  return (
    <>
      <View style={styles.gameEntry}>
        <View style={styles.gameHeader}>
          <Text style={styles.gameIndex}>{index + 1}</Text>
          <Text style={styles.gameText}>{gameData.name}</Text>

          <ToggleModeBtn 
            type='view'
            iconName={viewMode === 'OPEN' ? 'caret-up' : 'caret-down'} 
            isDisabled={false} 
            pressFunction={changeViewMode} 
          />
        </View>
      
        <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
          {viewMode === 'OPEN' && (
            <View style={styles.expandedGame}>
              <View style={styles.gameStats}>
                <View style={styles.statContainer}>
                  <Text style={styles.statTitle}>Hours: </Text><Text style={styles.hourText}>{gameData.hours}</Text>
                </View>
                <View style={styles.statContainer}>
                  <Text style={styles.statTitle}>Date Purchased: </Text><Text style={styles.hourText}>{gameData.datePurchased ? String(gameData.datePurchased).split('T')[0] : 'N/A'}</Text>
                </View>
              </View>
              <View style={styles.editBtnContainer}>
                <ToggleModeBtn
                  type='editGame'
                  iconName='edit' 
                  isDisabled={false} 
                  pressFunction={setModeEdit} 
                />
              </View>

            </View>

          )}
        </Animated.View>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)} // Handle the modal close
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <GameEntryForm
              index={index}
              gameData={gameData}
              setGameData={setGameData}
              closeModal={() => setIsModalVisible(false)} // Pass close function to the form
            />
          </View>
        </View>
      </Modal>
    </>
  );};

const styles = StyleSheet.create({
  gameEntry: {
    flexDirection: 'column',
    gap: Spacing.unit1o5,
    width: Spacing.unit10 - Spacing.unit,
    margin: Spacing.unit1o5 / 5,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.yellowPrime,
    borderWidth: Spacing.border,
    borderLeftColor: Colors.blue,
    borderRightColor: Colors.blue,
    zIndex: 0
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.unit1o5,
    paddingBottom: 0
  },
  gameIndex: {
    marginRight: Spacing.unit1o2,
    color: Colors.yellow,
    fontSize: FontSizes.mediumLess,
    fontWeight: 'bold',
    textShadow: `${Colors.yellowPrime} 1px 1px 5px`
  },
  gameText: {
    color: Colors.white,
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadow: `${Colors.black} 1px 1px 1px`
  },
  expandedGame: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blueMid
  },
  editBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Spacing.unit
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.unit1o5,
    paddingTop: Spacing.unit1o5
  },
  gameStats: {
    flex: 1
  },
  statTitle: {
    color: Colors.yellow,
    fontSize: FontSizes.mediumLess
  },
  hourText: {
    fontSize: FontSizes.mediumLess
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)' // Dark background for modal
  },
  modalContainer: {
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowRadius: Spacing.unit1o2
  }
});