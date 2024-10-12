import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, TextInput } from '../Customs';
import { deleteGamerTagAction } from '@/store/gamerTagReducer';
import { GamerTag } from '../../../backend/models/gamerTagModel';
import { PlatformData } from '@/store/userReducer';
import SymbolDropdown from './SymbolDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteam, faBattleNet } from '@fortawesome/free-brands-svg-icons';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import DelGamerTagBtn from './DelGamerTagBtn';
import { requestUpdateGamerTag, requestDeleteGamerTag } from '@/api/gamerTagRequests';
import ToggleModeBtn from '../ToggleModeBtn';

interface GamerTagFormProps {
  gamerTag: GamerTag;
}

export default function GamerTagForm({ gamerTag }: GamerTagFormProps) {
  const dispatch = useDispatch();

  const [disableSaveBtn, setDisableSaveBtn] = useState(false);

  const [gamerTagData, setGamerTagData] = useState(gamerTag);

  useEffect(() => {
    setDisableSaveBtn(!(gamerTagData.tag && gamerTagData.platform));
  }, [gamerTagData]);

  const steamLogo = <FontAwesomeIcon icon={faSteam} color={Colors.white} size='lg' style={styles.icon} />;
  const battleNetLogo = <FontAwesomeIcon icon={faBattleNet} color={Colors.white} size='lg' style={styles.icon} />;

  const platformData: Array<PlatformData> = [
    { platform: 'Steam', logo: steamLogo },
    { platform: 'BattleNet', logo: battleNetLogo },
  ];

  const getSelectedLogo = (selected: string) => {
    return (selected === 'Steam') ? steamLogo : battleNetLogo;
  };

  function handleTextInputChange(field: string, value: string) {
    setGamerTagData({...gamerTagData, [field]: value });
  }

  async function handleUpdateGamerTagPress() {
    try {
      await requestUpdateGamerTag(gamerTagData).then((response) => {
        if('error' in response) {
          console.error(response.error);
          return;
        }

        dispatch(deleteGamerTagAction({ deletedGamerTagId: response.gamerTag.id}));
      });
    } catch(err) {
      console.error(err);
      // Handle error in UI
    }
  }

  async function handleDeleteGamerTagPress() {
    try {
      await requestDeleteGamerTag(gamerTagData.id).then((response) => {
        if('error' in response) {
          console.error(response.error);
          return;
        }

        dispatch(deleteGamerTagAction({ deletedGamerTagId: gamerTagData.id}));
      });
    } catch(err) {
      console.error(err);
      // Handle error in UI
    }
  }

  return (
    <View style={styles.gamerTagEntry}>
      <DelGamerTagBtn pressFunction={handleDeleteGamerTagPress} />
      <ToggleModeBtn iconName='save' isDisabled={disableSaveBtn} pressFunction={handleUpdateGamerTagPress}/>

      <TextInput
        placeholder='GamerTag'
        style={styles.input}
        value={gamerTagData.tag}
        onChangeText={(value) => handleTextInputChange('tag', value)}
      />

      <SymbolDropdown
        data={platformData}
        value={gamerTagData.platform}
        selectedLogo={getSelectedLogo(gamerTagData.platform)}
        onChange={() => {}}
      />
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