import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GameListState {
  games: Array<{ id: number, name: string, hours: number | string, purchased: string, mode: string; }>;
}

export interface Game {
  id: number,
  name: string;
  hours: number | string;
  purchased: string;
  mode: string;
}

const initialState: GameListState = {
  games: [
    {
      id: 0,
      name: 'Destiny',
      hours: 1885,
      purchased: '2014-09-14',
      mode: 'VIEW',
    },
    {
      id: 1,
      name: 'The Witcher 3: Wild Hunt',
      hours: 200,
      purchased: '2015-05-19',
      mode: 'VIEW',
    },
    {
      id: 2,
      name: 'Overwatch',
      hours: 450,
      purchased: '2016-05-24',
      mode: 'VIEW',
    },
    {
      id: 3,
      name: 'Red Dead Redemption 2',
      hours: 350,
      purchased: '2018-10-26',
      mode: 'VIEW',
    },
    {
      id: 4,
      name: 'Cyberpunk 2077',
      hours: 120,
      purchased: '2020-12-10',
      mode: 'VIEW',
    },
    {
      id: 5,
      name: 'Elden Ring',
      hours: 180,
      purchased: '2022-02-25',
      mode: 'VIEW',
    },
    {
      id: 6,
      name: 'Hogwarts Legacy',
      hours: 90,
      purchased: '2023-02-10',
      mode: 'VIEW',
    },
    {
      id: 7,
      name: 'The Legend of Zelda: Breath of the Wild',
      hours: 300,
      purchased: '2017-03-03',
      mode: 'VIEW',
    },
    {
      id: 8,
      name: 'God of War',
      hours: 250,
      purchased: '2018-04-20',
      mode: 'VIEW',
    },
    {
      id: 9,
      name: 'Final Fantasy VII Remake',
      hours: 150,
      purchased: '2020-04-10',
      mode: 'VIEW',
    },
  ]
};

export const gameListSlice = createSlice({
  name: 'gameListData',
  initialState,
  reducers: {
    addGameAction: (state, action: PayloadAction<{ id: number, name: string, hours: number | string, purchased: string, mode: string }>) => {
      state.games.push(action.payload);
    },

    replaceGameAction: (state, action: PayloadAction<{ index: number, game: Game }>) => {
      const { index, game } = action.payload;
      state.games[index] = game;
    },

    sortGamesAction: (state, action: PayloadAction<{sort: string}>) => {
      switch(action.payload.sort) {
      case 'hours':
        state.games.sort((a, b) => parseInt(b.hours) - parseInt(a.hours));
        break;

      case 'purchased':
        state.games.sort((a, b) => new Date(a.purchased) - new Date(b.purchased));
        break;

      case 'entered':
        state.games.sort((a, b) => a.id - b.id);
        break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addGameAction, replaceGameAction, sortGamesAction} = gameListSlice.actions;

export default gameListSlice.reducer;