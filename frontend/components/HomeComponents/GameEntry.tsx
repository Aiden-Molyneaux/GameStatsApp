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
    percentComplete: item.percentComplete,
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
      percentComplete: gameData.percentComplete,
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
      toValue: viewMode === 'OPEN' ? hasBeenPlayed ? Spacing.unit2 * 1.2 : Spacing.unit2 * 0.85 : 0, // Adjust height for open/closed
      duration: 500, // Animation duration
      useNativeDriver: false, // Height requires useNativeDriver to be false
    }).start();
  }, [viewMode]);

  const hasBeenPlayed = gameData.hours > 0;

  return (
    <>
      { !isModalVisible ?
      
        <View style={styles.gameEntryContainer}>
          <View style={styles.gameIndexContainer}>
            <Text style={styles.gameIndex}>{index + 1}</Text>
          </View>
          <View style={{...styles.gameEntry}}>
            <View style={{...styles.gameHeader, backgroundColor: gameData.headerColour }}>
          
              <Text style={{...styles.titleText, color: gameData.titleColour}}>{gameData.name}</Text>
            </View> 
      
            { viewMode === 'OPEN' && ( 
              <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>  
                <View style={styles.expandedGame}>
                  <View style={styles.gameStats}>
                    <View style={styles.statContainer}>
                      <Text style={styles.statTitle}>Hours Played: </Text><Text style={styles.statText}>{gameData.hours ? gameData.hours : 'Never Played'}</Text>
                    </View>
                    { hasBeenPlayed && <View style={styles.statContainer}>
                      <Text style={styles.statTitle}>Percent Complete: </Text><Text style={styles.statText}>{gameData.percentComplete}</Text>
                    </View> }
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
        </View>
        : <GameEntryForm
          index={index}
          gameData={gameData}
          setGameData={setGameData}
          setIs
          closeModal={() => setIsModalVisible(false)}
          setIsPressed={setIsPressed}
        />
      }
    </>
  );};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    padding: Spacing.unit1o5
  },
  gameEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray,
    borderTopWidth: Spacing.border
  },
  gameEntry: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: Spacing.unit1o5,
  },
  gameHeader: {
    alignItems: 'center',
    padding: Spacing.unit1o5,
    borderColor: Colors.black,
    borderWidth: Spacing.border,
    borderRadius: 10,
    overflow: 'hidden'
  },
  gameIndexContainer: {
    alignItems: 'center',
    width: Spacing.unit,
  },
  gameIndex: {
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titleText: {
    flex: 1,
    color: Colors.white,
    fontSize: FontSizes.larger,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3
  },
  expandedGame: {
    position: 'absolute',
    top: Spacing.unit1o10,
    flexDirection: 'row',
    width: '100%',
    height: '110%',
    backgroundColor: Colors.screenGray
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
    color: Colors.black,

  },
  statText: {
    color: Colors.black,
  }

});