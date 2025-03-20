import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Game, PartialGame } from '../../backend/models/gameModel';

export interface GameListItem extends Game {
  mode?: string;
  tempTitle?: string;
  tempTitleColour?: string;
  tempHeaderColour?: string;
}

export interface PartialGameListItem extends PartialGame {
  mode: string;
  tempTitle?: string;
  tempTitleColour?: string;
  tempHeaderColour?: string;
}

export interface GameList {
  games: GameListItem[];
  sortMode: string;
}

const initialGameState: GameList = {
  games: [],
  sortMode: 'entered'
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
      
      // Handle placing the updated game in the correct position
      switch(state.sortMode) {
      case 'hours':
        state.games.sort((a, b) => parseInt(b.hours) - parseInt(a.hours));
        break;
      case 'datePurchased':
        state.games.sort((a, b) => {
          // Handle null values - push them to the end
          if (a.datePurchased === null && b.datePurchased === null) return 0;
          if (a.datePurchased === null) return 1;
          if (b.datePurchased === null) return -1;
          
          // Sort by date when both values exist
          return new Date(a.datePurchased).getTime() - new Date(b.datePurchased).getTime();
        });
        break;
      case 'entered':
        state.games.sort((a, b) => a.id - b.id);
        break;
      }
    },

    sortGamesAction: (state, action: PayloadAction<{sortMode: string}>) => {
      switch(action.payload.sortMode) {
      case 'hours':
        state.sortMode = 'hours';
        state.games.sort((a, b) => parseInt(b.hours) - parseInt(a.hours));
        break;

      case 'datePurchased':
        state.sortMode = 'datePurchased';
        state.games.sort((a, b) => {
          // Handle null values - push them to the end
          if (a.datePurchased === null && b.datePurchased === null) return 0;
          if (a.datePurchased === null) return 1;
          if (b.datePurchased === null) return -1;
          
          // Sort by date when both values exist
          return new Date(a.datePurchased).getTime() - new Date(b.datePurchased).getTime();
        });
        break;

      case 'entered':
        state.sortMode = 'entered';
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
    },

    reset: (state) => {
      state.games = initialGameState.games;
      state.sortMode = initialGameState.sortMode;
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
  setOpenCloseStatusAction,
  reset
} = gameListSlice.actions;

export default gameListSlice.reducer;