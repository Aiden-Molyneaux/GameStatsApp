import api from './api';
import { Game, PartialGame, UpdatedGame } from '../../backend/models/gameModel';

// Deprecated - I believe we used it to make sure that by default games were kept in the order they were entered, but this should be default SQL behaviour
// export async function getNextGameId(): Promise<APIGameIdResponse> {
//   try {
//     const response = await api.get<APIResponse>('api/games');
//     const { games } = response.data;

//     const nextId = 1 + games.reduce((maxId, item) => {
//       return item.id > maxId ? item.id : maxId;
//     }, games[0].id);
  
//     return nextId;
//   } catch (error) {
//     return console.error(`Client Error: getNextGameId failed, \n${error}`);
//   }
// }

type requestFetchGamesByUserReturn = { games: Game[] } | { error: string };

export async function requestFetchGamesByUser(): Promise<requestFetchGamesByUserReturn> {  
  try {
    const response = await api.get<requestFetchGamesByUserReturn>('api/games');

    if (response.status !== 200) {
      return { error: `Fetch Games By User Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }

    if ('games' in response.data) {
      return { games: response.data.games };
    }

    return { error: 'Fetch Games By User Request FAILURE: unexpected response format' };
  } catch (err) { 
    return { error: `Fetch Games By User Request ERROR: ${err}`};
  }
};

type requestCreateGameReturn = { game: Game } | { error: string };

export async function requestCreateGame(newGame: PartialGame): Promise<requestCreateGameReturn> {  
  try {
    const response = await api.post<requestCreateGameReturn>('api/games', { newGame });

    if (response.status !== 200) {
      return { error: `Create Game Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }
    
    if ('game' in response.data) {
      return { game: response.data.game };
    }
    
    return { error: 'Create Game Request FAILURE: unexpected response format' };
  } catch (err) { 
    return { error: `Create Game Request ERROR: ${err}`};
  }
};

type requestUpdateGameReturn = { game: Game } | { error: string };

export async function requestUpdateGame(updatedGame: UpdatedGame): Promise<requestUpdateGameReturn> {  
  try {
    const response = await api.patch<requestUpdateGameReturn>('api/games', { updatedGame });

    if (response.status !== 200) {
      return { error: `Update Game Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }
    
    if ('game' in response.data) {
      return { game: response.data.game };
    }
    
    return { error: 'Update Game Request FAILURE: unexpected response format' };
  } catch (err) { 
    return { error: `Update Game Request ERROR: ${err}`};
  }
};

type requestDeleteGameReturn = { deletedGameId: number } | { error: string };

export async function requestDeleteGame(gameId: number): Promise<requestDeleteGameReturn> {  
  try {
    const response = await api.delete<requestDeleteGameReturn>(`api/games?gameId=${gameId}`);

    if (response.status !== 200) {
      return { error: `Delete Game Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }

    if ('deletedGameId' in response.data) {
      return { deletedGameId: response.data.deletedGameId };
    }
 
    return { error: 'Delete Game Request FAILURE: unexpected response format' };
  } catch (err) {
    return { error: `Delete Game Request ERROR: ${err}` };
  }
};