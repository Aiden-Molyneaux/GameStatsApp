import api from './api';
import { Game, PartialGame, UpdatedGame } from '../../backend/models/gameModel';

interface GameError {
  error: {
    code: 'GAME_FETCH_FAILED' | 'SERVER_ERROR' | 'GAME_ERROR' | 'FRONTEND_ERROR';
    message: string;
  }
}

const frontendError = {
  code: 'FRONTEND_ERROR' as const,
  message: `Game service error. Please try again later.`
}

type requestFetchGamesByUserReturn = { games: Game[] } | GameError;

export async function requestFetchGamesByUser(): Promise<requestFetchGamesByUserReturn> {  
  try {
    const response = await api.get<requestFetchGamesByUserReturn>('api/games');

    if ('error' in response.data) {
      return { error: response.data.error };
    }

    return { games: response.data.games };
  } catch (err) { 
    console.error('Fetch Games By User Request ERROR:', err);

    return { error: frontendError };
  }
};

type requestCreateGameReturn = { game: Game } | GameError;

export async function requestCreateGame(newGame: PartialGame): Promise<requestCreateGameReturn> {  
  try {
    const response = await api.post<requestCreateGameReturn>('api/games', { newGame });

    if ('error' in response.data) {
      return { error: response.data.error };
    }
    
    return { game: response.data.game };
  } catch (err) { 
    console.error('Create Game Request ERROR:', err);

    return { error: frontendError };
  }
};

type requestUpdateGameReturn = { game: Game } | GameError;

export async function requestUpdateGame(updatedGame: UpdatedGame): Promise<requestUpdateGameReturn> {  
  try {
    const response = await api.patch<requestUpdateGameReturn>('api/games', { updatedGame });

    if ('error' in response.data) {
      return { error: response.data.error };
    }
    
    return { game: response.data.game };
  } catch (err) { 
    console.error('Update Game Request ERROR:', err);

    return { error: frontendError };
  }
};

type requestDeleteGameReturn = { deletedGameId: number } | GameError;

export async function requestDeleteGame(gameId: number): Promise<requestDeleteGameReturn> {  
  try {
    const response = await api.delete<requestDeleteGameReturn>(`api/games?gameId=${gameId}`);

    if ('error' in response.data) {
      return { error: response.data.error };
    }

    return { deletedGameId: response.data.deletedGameId };
  } catch (err) {
    console.error('Delete Game Request ERROR:', err);

    return { error: frontendError };
  }
};