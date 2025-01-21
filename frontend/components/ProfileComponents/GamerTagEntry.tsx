import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from '../Customs';
import { deleteGamerTagAction, GamerTagListItem, updateGamerTagAction } from '@/store/gamerTagReducer';
import { GamerTag } from '../../../backend/models/gamerTagModel';
import { PlatformData } from '@/store/userReducer';
import SymbolDropdown from './SymbolDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteam, faBattleNet } from '@fortawesome/free-brands-svg-icons';
import { Colors, FontSizes, Spacing } from '@/constants/Constants';
import DelGamerTagBtn from './DelGamerTagBtn';
import { requestUpdateGamerTag, requestDeleteGamerTag } from '@/api/gamerTagRequests';
import ToggleModeBtn from '../ToggleModeBtn';
import GamerTagForm from './GamerTagForm';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

interface GamerTagFormProps {
  gamerTag: GamerTagListItem;
  index: number;
  edit?: boolean;
}

export default function GamerTagEntry({ gamerTag }: GamerTagFormProps) {
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

  function setModeEdit() {
    const updatedGamerTag: GamerTagListItem = {
      ...gamerTagData,
      mode: EDIT
    };

    setGamerTagData(updatedGamerTag);
    dispatch(updateGamerTagAction({ gamerTag: updatedGamerTag }));
  }

  return (gamerTagData.mode === VIEW) ? (
    <View style={styles.gamerTagEntry}>
      { getSelectedLogo(gamerTagData.platform) }
      <Text style={{ color: Colors.yellow }}>{gamerTagData.tag === '' ? 'new Gamertag' : gamerTagData.tag}</Text>
      <ToggleModeBtn
        type='edit' 
        iconName='edit' 
        isDisabled={false} 
        pressFunction={setModeEdit}
      />
    </View>
  ) : (
    <GamerTagForm gamerTag={gamerTagData}/>
  );
};

const styles = StyleSheet.create({
  gamerTagEntry: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  index: {
    marginRight: Spacing.unit1o2, 
    fontSize: FontSizes.small
  },
  icon: {
    marginRight: Spacing.unit1o2
  },
  selectedText: { 
    color: Colors.white, 
    fontSize: FontSizes.mediumLess, 
    backgroundColor: Colors.bluePrime 
  }
});