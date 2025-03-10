import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Game, PartialGame } from '../../backend/models/gameModel';

export interface GameListItem extends Game {
  mode?: string;
}

export interface PartialGameListItem extends PartialGame {
  mode: string;
}

export interface GameList {
  games: GameListItem[];
}

const initialGameState: GameList = {
  games: []
};

export const gameListSlice = createSlice({
  name: 'gameData',
  initialState: initialGameState,
  reducers: {
    fetchGamesSuccess: (state, action: PayloadAction<{ games: Game[] }>) => {
      state.games = action.payload.games;
    },

    addGameAction: (state, action: PayloadAction<{ game: GameListItem }>) => {
      const newGame = { ...action.payload.game, mode: 'EDIT' };

      state.games.push(newGame);
    },

    updateGameAction: (state, action: PayloadAction<{ game: GameListItem }>) => {
      const { game } = action.payload;
      state.games = state.games.map(obj => obj.id === game.id ? game : obj);
    },

    sortGamesAction: (state, action: PayloadAction<{sort: string}>) => {
      switch(action.payload.sort) {
      case 'hours':
        state.games.sort((a, b) => parseInt(b.hours) - parseInt(a.hours));
        break;

      case 'datePurchased':
        state.games.sort((a, b) => new Date(a.datePurchased) - new Date(b.datePurchased));
        break;

      case 'entered':
        state.games.sort((a, b) => a.id - b.id);
        break;
      }
    },

    deleteGameAction: (state, action: PayloadAction<{ deletedGameId: number }>) => {
      state.games = state.games.filter(item => item.id !== action.payload.deletedGameId);
    },

    setIdToPositionAction: (state) => {
      state.games = state.games.map((item, index) => ({ ...item, id: index }));
    },

    setOpenCloseStatusAction: (state, action: PayloadAction<{ mode: string }>) => {
      state.games = state.games.map(game => ({
        ...game,
        mode: action.payload.mode
      }));
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchGamesSuccess,
  addGameAction,
  updateGameAction,
  sortGamesAction,
  deleteGameAction,
  setIdToPositionAction,
  setOpenCloseStatusAction
} = gameListSlice.actions;

export default gameListSlice.reducer;