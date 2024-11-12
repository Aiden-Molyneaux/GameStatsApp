import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { GameListItem, updateGameAction } from '@/store/gameReducer';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import GameEntryForm from './GameEntryForm';
import CustomButton from './CustomButton';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GameEntryProps {
  item: GameListItem,
  index: number,
  setIsPressed: (data: boolean) => void
}

export default function GameEntry({ item, index, setIsPressed }: GameEntryProps) {
  const dispatch = useDispatch();
  
  const [ gameData, setGameData] = useState({
    id: item.id,
    index: index,
    name: item.name,
    hours: item.hours,
    datePurchased: item.datePurchased,
    titleColour: item.titleColour,
    headerColour: item.headerColour,
    mode: item.mode
  });

  const [ viewMode, setViewMode ] = useState('CLOSED');
  const [isModalVisible, setIsModalVisible] = useState(item.mode === 'NEW');

  const animatedHeight = useRef(new Animated.Value(viewMode === 'OPEN' ? 60 : 0)).current;

  function setModeEdit() {
    const updatedGame: GameListItem = {
      id: gameData.id,
      name: gameData.name,
      hours: gameData.hours,
      datePurchased: gameData.datePurchased,
      titleColour: gameData.titleColour,
      headerColour: gameData.headerColour,
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
      <View style={{...styles.gameEntry, shadowColor: gameData.titleColour}}>
        <View style={{...styles.gameHeader, backgroundColor: gameData.headerColour }}>
          <Text style={styles.gameIndex}>{index + 1}</Text>
          <Text style={{...styles.titleText, color: gameData.titleColour}}>{gameData.name}</Text>

          <CustomButton
            size={'small'}
            iconName={viewMode === 'OPEN' ? 'caret-up' : 'caret-down'}
            isDisabled={false}
            isPressed={false}
            pressFunction={changeViewMode}
          />
        </View>
      
        {viewMode === 'OPEN' && ( 
          <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>  
            <View style={styles.expandedGame}>
              <View style={styles.gameStats}>
                <View style={styles.statContainer}>
                  <Text style={styles.statTitle}>Hours: </Text><Text style={styles.statText}>{gameData.hours}</Text>
                </View>
                <View style={styles.statContainer}>
                  <Text style={styles.statTitle}>Date Purchased: </Text><Text style={styles.statText}>{gameData.datePurchased ? String(gameData.datePurchased).split('T')[0] : 'N/A'}</Text>
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
          </Animated.View>)}
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
              setIs
              closeModal={() => setIsModalVisible(false)}
              setIsPressed={setIsPressed}
            />
          </View>
        </View>
      </Modal>
    </>
  );};

const styles = StyleSheet.create({
  gameEntryContainer: {

  },
  gameEntry: {
    flexDirection: 'column',
    width: Spacing.unit10 - Spacing.unit,
    margin: Spacing.unit1o5,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.white,
    borderBottomWidth: 3,
    borderRadius: Spacing.unit1o5,
    shadowOpacity: 0.9,
    shadowRadius: Spacing.unit1o5
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.unit1o5,
    borderRadius: Spacing.unit1o10

  },
  gameIndex: {
    marginRight: Spacing.unit1o2,
    color: Colors.white,
    fontSize: FontSizes.mediumLess,
    fontWeight: 'bold'
  },
  titleText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.large,
    textAlign: 'left',
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadow: `${Colors.black} 1px 1px 1px`
  },
  expandedGame: {
    position: 'absolute',
    top: -Spacing.unit1o10,
    flexDirection: 'row',
    width: '100%',
    height: '110%',
    backgroundColor: Colors.white,
    borderBottomRightRadius: Spacing.unit1o5,
    borderBottomLeftRadius: Spacing.unit1o5,
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
  statText: {
    color: Colors.black,
    fontSize: FontSizes.mediumLess
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)' // Dark background for modal
  },
  modalContainer: {
    shadowColor: Colors.orange,
    shadowOpacity: 0.5,
    shadowRadius: Spacing.unit1o2
  }
});