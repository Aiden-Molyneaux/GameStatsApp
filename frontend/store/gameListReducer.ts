import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameListState {
  games: Array<{ name: string, hours: number, purchased: string, mode: string; }>;
}

export interface Game {
  name: string;
  hours: number;
  purchased: string;
  mode: string;
}

const initialState: GameListState = {
  games: [
    {
      name: 'Destiny',
      hours: 1885,
      purchased: "a long time ago",
      mode: "VIEW",
    }
  ]
}

export const gameListSlice = createSlice({
  name: 'gameListData',
  initialState,
  reducers: {
    addGameAction: (state, action: PayloadAction<{ name: string, hours: number, purchased: string, mode: string }>) => {
      state.games.push(action.payload)
    },

    replaceGameAction: (state, action: PayloadAction<{ index: number, game: Game }>) => {
      const { index, game } = action.payload;
      state.games[index] = game;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addGameAction, replaceGameAction} = gameListSlice.actions

export default gameListSlice.reducer