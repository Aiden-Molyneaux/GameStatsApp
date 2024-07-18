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
  favouriteGame: string;
  gamerTags: Array<GamerTag>;
}

const initialGamerTags: Array<GamerTag> = [
  { id: 0, gamerTag: 'Pachwick', platform: 'Steam' },
  { id: 1, gamerTag: 'Rimmy Tim', platform: 'BattleNet' },
];

const initialState: User = {
  id: 0,
  username: 'Pat',
  favouriteGame: 'Destiny',
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

    changeFavouriteGameAction: (state, action: PayloadAction<string>) => {
      state.favouriteGame = action.payload;
    },

    changeGamerTagAction: (state, action: PayloadAction<Array<GamerTag>>) => {
      state.gamerTags = action.payload;
    },

    deleteGamerTagAction: (state, action: PayloadAction<number>) => {
      state.gamerTags.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeNameAction, changeFavouriteGameAction, addGamerTagAction, changeGamerTagAction, deleteGamerTagAction } = userSlice.actions;

export default userSlice.reducer;