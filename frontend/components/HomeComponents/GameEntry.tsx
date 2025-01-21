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

  function getTruncatedString(text, maxWidth, font, maxLines = 2) {
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the font style (important for accurate measurements)
    context.font = font;

    // Split the text into words for line calculation
    const words = text.split(' ');
    let currentLine = '';
    const lines = [];

    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth > maxWidth) {
        // Push the current line to lines and reset for the next line
        lines.push(currentLine);
        currentLine = word;

        // Stop if we've reached the maximum number of lines
        if (lines.length >= maxLines) {
          lines.push('...');
          break;
        }
      } else {
        currentLine = testLine;
      }
    }

    // Add the last line if it's within the limit
    if (lines.length < maxLines && currentLine) {
      lines.push(currentLine);
    }

    // If there are too many lines, truncate the last one
    if (lines.length > maxLines) {
      let truncatedLine = '';
      for (const char of currentLine) {
        const testLine = truncatedLine + char;
        const testWidth = context.measureText(testLine + '...').width;

        if (testWidth > maxWidth) {
          break;
        }
        truncatedLine = testLine;
      }
      lines[maxLines - 1] = truncatedLine + '...';
    }

    return lines.join('\n');
  }

  return (
    <>
      { !isModalVisible ?
      
        <View style={styles.gameEntryContainer}>
          <Text style={styles.gameIndex}>{index + 1}</Text>
          <View style={{...styles.gameEntry}}>
            <View style={{...styles.gameHeader, backgroundColor: gameData.headerColour, borderRadius: gameData.name.length > 10 ? 40 : 2000  }}>
          
              <Text style={{...styles.titleText, color: gameData.titleColour}}>{gameData.name}</Text>
              { gameData.name.length > 25 
                ? <Text style={{...styles.titleText, color: gameData.titleColour}}>...</Text>
                : null 
              }
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

          {/* <Modal
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
          </Modal> */}
        </View>
        :               <GameEntryForm
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
    overflow: 'hidden'
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

    textAlign: 'center',
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
    width: '100%'
  },
  ellipsis: {
    color: Colors.black,
    fontSize: FontSizes.header,
    fontWeight: 'bold'
  }
});