import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamerTag } from '../../backend/models/gamerTagModel';
import { User } from '../../backend/models/userModel';

// export interface GamerTag {
//   id: number, 
//   tag: string, 
//   platform: string
// }

export interface PlatformData {
  platform: string;
  logo: React.JSX.Element;
}

// export interface User {
//   id: number;
//   username: string;
//   favouriteGame: string;
//   gamerTags: Array<GamerTag>;
// }

// interface User {
//   id: number;
//   username: string;
//   password: string;
//   email: string | null;
//   favouriteGame: string | null;
//   preferredPlatform: string | null;
//   numberOfGames: number | null;
// }

// const initialGamerTags: Array<GamerTag> = [
//   { id: 0, gamerTag: 'Pachwick', platform: 'Steam' },
//   { id: 1, gamerTag: 'Rimmy Tim', platform: 'BattleNet' },
// ];

const initialUserState = {
  user: {
    id: 0,
    username: '',
    favouriteGame: ''
  }
};
// {id: 0, username: "pat", password: "--", email: "--", favoriteGame: "--", preferedPlatfom: "--", numberOfGames: 0, gamerTags: []}

export const userSlice = createSlice({
  name: 'userData',
  initialState: initialUserState,
  reducers: {

    changeNameAction: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
    },

    changeFavouriteGameAction: (state, action: PayloadAction<string>) => {
      state.user.favouriteGame = action.payload;
    },

    changeUserAction: (state, action: PayloadAction<{user: User}>) => {
      state.user = { ...action.payload.user };
    },
    
    reset: (state) => {
      state.user = initialUserState.user;
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeNameAction, changeFavouriteGameAction, changeUserAction, reset } = userSlice.actions;

export default userSlice.reducer;