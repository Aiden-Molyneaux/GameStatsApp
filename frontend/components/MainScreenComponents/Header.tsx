import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text } from '../Customs'; 
import { Colors, Spacing } from '@/constants/Constants';
import headerTextImage from '../../assets/images/headerText.png';
import speakerGrillImage from '../../assets/images/speakerGrill.png';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.imgContainer}>
        <View style={styles.headerImgContainer}>
          <Image 
            source={headerTextImage}
            style={styles.headerImg}
          />
        </View>
        <View style={styles.speakerGrillImgContainer}>
          <Image 
            source={speakerGrillImage}
            style={styles.speakerGrillImg}
          />
        </View>
      </View>
      <Text style={styles.headerSubText}>Where Your Passion Began</Text>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const isSmallScreen = windowWidth < 450;

const styles = StyleSheet.create({
  headerContainer: {
    width: '95%',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: isSmallScreen ? Spacing.unit * 2 : Spacing.unit3o2,
  },
  headerImgContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-start',
  },
  headerImg: {
    width: isSmallScreen ? '100%' : '67%',
    height: '100%',
    resizeMode: 'contain',
  },
  speakerGrillImgContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
  },
  speakerGrillImg: {
    width: isSmallScreen ? '60%' : '40%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerSubText: {
    textAlign: 'center',
    color: Colors.grayPrime,
    alignSelf: 'flex-start',
    marginTop: isSmallScreen ? -Spacing.unit1o10 : 0,
    marginBottom: isSmallScreen ? Spacing.unit1o10 : 0
  },
});