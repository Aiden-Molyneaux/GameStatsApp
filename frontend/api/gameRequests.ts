import api from './api';

export interface partialGame {
  userId: number;
  name: string;
  hours: number | null;
  datePurchased: Date | null;
  mode: string;
}

interface Game {
  id: number;
  userId: number;
  name: string;
  hours: number | null;
  datePurchased: Date | null;
}

export interface APIResponse {
  games: Game[]
}

export interface APIGameIdResponse {
  nextId: number
}

export interface APIGameCreationResponse {
  game: Game
}

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

export async function requestFetchGamesByUser(): Promise<APIResponse | void> {  
  try {
    const response = await api.get<APIResponse>('api/games');
    const { games } = response.data;

    return { games };
  } catch (error) {
    return console.error(`Client Error: fetchGamesByUser failed, \n${error}`);
  }
};

type requestCreateGameReturn = { game: Game } | { error: string };

export async function requestCreateGame(newGame: partialGame): Promise<requestCreateGameReturn> {  
  try {
    const response = await api.post<requestCreateGameReturn>('api/games', { newGame });

    if (response.status !== 200) {
      if ('error' in response.data) {
        return { error: `Create Game Request FAILURE: ${response.data.error}` };
      }
      return { error: 'Create Game Request FAILURE: Unknown error' };
    }
    
    if ('game' in response.data) {
      return { game: response.data.game };
    }
    
    return { error: 'Create Game Request FAILURE: Unexpected response format' };
  } catch (err) { 
    return { error: `Create Game Request ERROR: ${err}`};
  }
};

type requestDeleteGameReturn = { deletedGameId: number } | { error: string };

export async function requestDeleteGame(gameId: number): Promise<requestDeleteGameReturn> {  
  try {
    const response = await api.delete<requestDeleteGameReturn>(`api/games?gameId=${gameId}`);

    if (response.status !== 200) {
      if ('error' in response.data) {
        return { error: `Delete Game Request FAILURE: ${response.data.error}` };
      }
      // Fallback if response.data does not have an error property
      return { error: 'Delete Game Request FAILURE: Unknown error' };
    }

    if ('deletedGameId' in response.data) {
      return { deletedGameId: response.data.deletedGameId };
    }
 
    return { error: 'Delete Game Request FAILURE: Unexpected response format' };
  } catch (err) {
    return { error: `Delete Game Request ERROR: ${err}` };
  }
};