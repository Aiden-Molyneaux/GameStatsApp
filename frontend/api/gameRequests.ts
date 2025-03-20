import api from './api';
import { Game, PartialGame, UpdatedGame } from '../../backend/models/gameModel';

interface GameError {
  error: {
    code: 'GAME_FETCH_FAILED' | 'SERVER_ERROR' | 'GAME_ERROR' | 'AUTH_ERROR';
    message: string;
  }
}

type requestFetchGamesByUserReturn = { games: Game[] } | GameError;

export async function requestFetchGamesByUser(): Promise<requestFetchGamesByUserReturn> {  
  try {
    const response = await api.get<requestFetchGamesByUserReturn>('api/games');

    if ('error' in response.data) {
      const error = response.data.error;

      return {
        error: {
          code: error.code,
          message: error.message
        }
      };
    }
    return { games: response.data.games };
  } catch (err) { 
    console.error('Fetch Games By User Request ERROR:', err);

    return {
      error: {
        code: 'SERVER_ERROR',
        message: `Game service error`
      }
    };
  }
};

type requestCreateGameReturn = { game: Game } | { error: string };

export async function requestCreateGame(newGame: PartialGame): Promise<requestCreateGameReturn> {  
  try {
    console.log(newGame);
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