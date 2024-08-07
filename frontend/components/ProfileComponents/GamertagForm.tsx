import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, TextInput } from '../Customs'; 
import { GamerTag, PlatformData, User, deleteGamerTagAction }  from '@/store/userReducer';
import SymbolDropdown from './SymbolDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteam, faBattleNet } from '@fortawesome/free-brands-svg-icons';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import DelGamerTagBtn from './DelGamerTagBtn';

interface GamerTagFormProps {
  item: GamerTag;
  index: number;
  edit?: boolean;
  handleTextInputChange: (field: string, value: string, index: number) => void;
  userData: User;
  setUserData: (data: unknown) => void;
}

export default function GamerTagForm({item, index, edit = false, handleTextInputChange, userData, setUserData}: GamerTagFormProps) {
  const dispatch = useDispatch();

  const steamLogo = <FontAwesomeIcon icon={faSteam} color={Colors.white} size='lg' style={styles.icon} />;
  const battleNetLogo = <FontAwesomeIcon icon={faBattleNet} color={Colors.white} size='lg' style={styles.icon} />;

  const platformData: Array<PlatformData> = [
    { platform: 'Steam', logo: steamLogo },
    { platform: 'BattleNet', logo: battleNetLogo },
  ];

  const getSelectedLogo = (selected: string) => {
    return (selected === 'Steam') ? steamLogo : battleNetLogo;
  };

  function delGamerTag() {
    const newGamerTags = [...userData.gamerTags.slice(0, index), ...userData.gamerTags.slice(index + 1)];

    setUserData({...userData, gamerTags: newGamerTags});
    dispatch(deleteGamerTagAction(index))
  }

  return edit ? (
    <View style={styles.gamerTagEntry}>
      <DelGamerTagBtn pressFunction={delGamerTag} />
      <TextInput
        placeholder='GamerTag'
        style={styles.input}
        value={item.gamerTag}
        onChangeText={(value) => handleTextInputChange('gamerTag', value, index)}
      />

      <SymbolDropdown
        data={platformData}
        value={item.platform}
        selectedLogo={getSelectedLogo(item.platform)}
        onChange={(item: PlatformData) => {
          const newGamerTags: Array<GamerTag> = JSON.parse(JSON.stringify(userData.gamerTags));
          newGamerTags[index].platform = item.platform;

          setUserData({ ...userData, gamerTags: newGamerTags });
        }}
      />
    </View>
  ) : (
    <View style={styles.gamerTagEntry}>
      <Text style={styles.index}>{index + 1}:</Text>
      <Text style={{ color: Colors.yellow }}>{item.gamerTag}</Text>
      {getSelectedLogo(item.platform)}
    </View>
  );
};

const styles = StyleSheet.create({
  gamerTagEntry: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    margin: Spacing.unit1o5,
    padding: Spacing.unit1o5,
    fontSize: FontSizes.mediumLess,
    borderColor: Colors.yellow,
    borderWidth: Spacing.border,
    borderRadius: Spacing.unit1o5,
    color: Colors.white,
  },
  index: {
    marginRight: Spacing.unit1o2, 
    fontSize: FontSizes.small
  },
  icon: {
    marginLeft: Spacing.unit1o2
  },
  selectedText: { 
    color: Colors.white, 
    fontSize: FontSizes.mediumLess, 
    backgroundColor: Colors.bluePrime 
  }
});