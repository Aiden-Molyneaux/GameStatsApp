import * as Font from 'expo-font';

export const useFonts = async () => {
  await Font.loadAsync({
    'MonomaniacOne-Regular': require('../assets/fonts/MonomaniacOne-Regular.ttf'),
    'Jersey20-Regular': require('../assets/fonts/Jersey20-Regular.ttf'),
  });
}; 