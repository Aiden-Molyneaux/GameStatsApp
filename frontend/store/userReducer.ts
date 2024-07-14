import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GamerTag {id: number, gamerTag: string, platform: string}

export interface PlatformData {
  platform: string;
  logo: React.JSX.Element;
}

export interface User {
  id: number;
  username: string;
  favoriteGame: string;
  gamerTags: Array<GamerTag>;
}

const initialGamerTags: Array<GamerTag> = [
  { id: 0, gamerTag: 'Pachwick', platform: 'Steam' },
  { id: 1, gamerTag: 'Rimmy Tim', platform: 'BattleNet' },
];

const initialState: User = {
  id: 0,
  username: 'Pat',
  favoriteGame: 'Destiny',
  gamerTags: initialGamerTags,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addGamerTagAction: (state, action: PayloadAction<GamerTag>) => {
      state.gamerTags.push(action.payload);
    },

    changeNameAction: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    changeFavoriteGameAction: (state, action: PayloadAction<string>) => {
      state.favoriteGame = action.payload;
    },

    changeGamerTagAction: (state, action: PayloadAction<Array<GamerTag>>) => {
      state.gamerTags = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeNameAction, changeFavoriteGameAction, addGamerTagAction, changeGamerTagAction } = userSlice.actions;

export default userSlice.reducer;