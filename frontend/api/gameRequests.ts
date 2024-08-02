import api from './api';

export interface partialGame {
  userId: number;
  name: string;
  hours: number | null;
  datePurchased: Date | null;
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

export interface APIGameCreateResponse {
  game: Game
}

export async function getNextGameId(): Promise<APIGameIdResponse> {
  try {
    const response = await api.get<APIResponse>('api/games');
    const { games } = response.data;

    const nextId = 1 + games.reduce((maxId, item) => {
      return item.id > maxId ? item.id : maxId;
    }, games[0].id);
  
    return nextId;
  } catch (error) {
    return console.error(`Client Error: getNextGameId failed, \n${error}`);
  }
}

export async function fetchGamesByUser(): Promise<APIResponse> {  
  try {
    const response = await api.get<APIResponse>('api/games');
    const { games } = response.data;

    return { games };
  } catch (error) {
    return console.error(`Client Error: fetchGamesByUser failed, \n${error}`);
  }
};

export async function createGame(newGame: partialGame): Promise<APIGameCreateResponse | void> {  
  try {
    const response = await api.post<APIGameCreateResponse>('api/games', { newGame });
    const { game } = response.data;
  
    return { game };
  } catch (error) {
    return console.error(`Error: Failed game creation, \n${error}`);
  }
};