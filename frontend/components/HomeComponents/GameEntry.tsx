import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { GameListItem, updateGameAction } from '@/store/gameReducer';
import { Colors, FontSizes, Fonts, Spacing } from '@/constants/Constants';
import { Text } from '@/components/Customs';
import ToggleModeBtn from '../ToggleModeBtn';
import GameEntryForm from './GameEntryForm';
import CustomButton from './CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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

  const animatedHeight = useRef(new Animated.Value(viewMode === 'OPEN' ? Spacing.unit : 0)).current;

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
      toValue: viewMode === 'OPEN' ? Spacing.unit2 * .85 : 0, // Adjust height for open/closed
      duration: 500, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [viewMode]);

  return (
    <View style={styles.gameEntryContainer}>
      <Text style={styles.gameIndex}>{index + 1}</Text>
      <View style={{...styles.gameEntry}}>
        <View style={{...styles.gameHeader, backgroundColor: gameData.headerColour }}>
          
          <Text style={{...styles.titleText, color: gameData.titleColour}}>{gameData.name}</Text>

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
            </View>
          </Animated.View>)}
      </View>
      
      <View style={styles.button}>
        <ToggleModeBtn
          type='editGame'
          iconName='book' 
          isDisabled={false} 
          pressFunction={changeViewMode} 
        />
      </View>

      <View style={styles.button}>
        <ToggleModeBtn
          type='editGame'
          iconName='edit' 
          isDisabled={false} 
          pressFunction={setModeEdit} 
        />
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)} // Handle the modal close
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.ellipsis}>⋮</Text>
            <GameEntryForm
              index={index}
              gameData={gameData}
              setGameData={setGameData}
              setIs
              closeModal={() => setIsModalVisible(false)}
              setIsPressed={setIsPressed}
            />
            <Text style={styles.ellipsis}>⋮</Text>
          </View>
        </View>
      </Modal>
    </View>
  );};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    padding: Spacing.unit1o5
  },
  gameEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameEntry: {
    flexDirection: 'column',
    flex: 1,
    marginVertical: Spacing.unit1o5,
    backgroundColor: Colors.bluePrime,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.unit1o5,
  },
  gameIndex: {
    marginHorizontal: Spacing.unit1o3,
    color: Colors.black,
    fontSize: FontSizes.mediumLess,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.large,
    marginLeft: Spacing.unit1o3,
    textAlign: 'left',
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadow: `${Colors.black} 1px 1px 1px`
  },
  expandedGame: {
    position: 'absolute',
    top: Spacing.unit1o10,
    flexDirection: 'row',
    width: '100%',
    height: '110%',
    backgroundColor: Colors.trout
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
    backgroundColor: 'rgba(209, 213, 192, 1)', // Dark background for modal
    borderColor: Colors.grayPrime,
    borderWidth: 5,
    borderRadius: 15
  },
  modalContainer: {

  },
  ellipsis: {
    color: Colors.black,
    fontSize: FontSizes.header,
    fontWeight: 'bold'
  }
});