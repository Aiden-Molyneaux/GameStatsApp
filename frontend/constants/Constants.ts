import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

const em1 = height / 24;

export const Fonts = {
  monospace: 'monospace',
  monomaniac: 'MonomaniacOne-Regular'
};

export const FontSizes = {
  header: em1,
  large: em1 * 3/5,
  medium: em1 * 1/2,
  mediumLess: em1 * 2/5,
  small: em1 * 1/3
};

export const Spacing = {
  unit10: em1 * 10,
  unit8: em1 * 8,
  unit7: em1 * 7,
  unit5: em1 * 5,
  unit3: em1 * 3,
  unit2: em1 * 2,
  unit3o2: em1 * 3/2,
  unit: em1,
  unit1o2: em1 * 1/2,
  unit1o3: em1 * 1/3,
  unit1o5: em1 * 1/5,
  unit1o10: em1 * 1/10,

  screenWidth: width,
  screenHeight: height,

  border: 2,
  borderThick: 5
};

export const Colors = {
  white: '#ffffff',
  gray: '#b9bbb6',
  grayPrime: '#777b7e',
  grayEdge: '#46494b',
  black: '#1d1c1a',
  orange: '#FAA916',
  orangeEdge: '#c68611',
  screenGray: '#d1d5c0',
  gameCubeGreen: '#019190',
  greenEdge: '#007269',
  appTitlePurple: '#6557a7',
  red: '#ff0000',
};

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';

// light: {
//   text: '#11181C',
//   subtext: 'white',
//   background: '#fff',
//   tint: tintColorLight,
//   icon: '#687076',
//   tabIconDefault: '#687076',
//   tabIconSelected: tintColorLight,
// },
// dark: {
//   text: '#ffc92a',
//   subtext: 'white',
//   background: '#212833',
//   primaryHighlight: '#52637f',
//   secondary: 'b78c25',
//   secondaryHighlight: '#ffce1f',
// },
