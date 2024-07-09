import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GameListState {
  games: Array<{ name: string, hours: number, purchased: string }>;
}

const initialState: GameListState = {
  games: [
    {
      name: 'Destiny',
      hours: 1885,
      purchased: "a long time ago",
    }
  ]
}

export const gameListSlice = createSlice({
  name: 'gameListData',
  initialState,
  reducers: {
    addGameAction: (state, action: PayloadAction<{ name: string, hours: number, purchased: string }>) => {
      state.games.push(action.payload)
  }
  },
})

// Action creators are generated for each case reducer function
export const { addGameAction } = gameListSlice.actions

export default gameListSlice.reducer