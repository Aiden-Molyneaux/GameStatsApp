import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { APIResponse } from '@/api/gameRequests';

export interface GameListItem {
  id: number,
  userId: number,
  name: string;
  hours: number | string;
  purchasedDate: string;
  mode: string;
}

export interface GameList {
  games: GameListItem[];
}

const initialState: GameList = {
  games: []
};

export const gameListSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    fetchGamesSuccess: (state, action: PayloadAction<APIResponse>) => {
      const newGames = action.payload.games.map((game) => {
        const shouldEdit = Object.values(game).some(value => value === '' || value === null);
        return {
          ...game,
          mode: shouldEdit ? 'EDIT' : 'VIEW'
        };
      });
      
      console.log({newGames});

      state.games = newGames;
    },

    addGameAction: (state, action: PayloadAction<GameListItem>) => {
      state.games.push(action.payload);
    },

    replaceGameAction: (state, action: PayloadAction<{ id: number, game: GameListItem }>) => {
      const { id, game } = action.payload;
      state.games = state.games.map(obj => obj.id === id ? game : obj);
    },

    sortGamesAction: (state, action: PayloadAction<{sort: string}>) => {
      switch(action.payload.sort) {
      case 'hours':
        state.games.sort((a, b) => parseInt(b.hours) - parseInt(a.hours));
        break;

      case 'purchasedDate':
        state.games.sort((a, b) => new Date(a.purchasedDate) - new Date(b.purchasedDate));
        break;

      case 'entered':
        state.games.sort((a, b) => a.id - b.id);
        break;
      }
    },

    deleteGameAction: (state, action: PayloadAction<number>) => {
      state.games = state.games.filter(item => item.id !== action.payload);
    },

    setIdToPositionAction: (state) => {
      state.games = state.games.map((item, index) => ({ ...item, id: index }));
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchGamesSuccess, addGameAction, replaceGameAction, sortGamesAction, deleteGameAction, setIdToPositionAction} = gameListSlice.actions;

export default gameListSlice.reducer;