import { fetchGamesSuccess } from '../store/gameReducer';
import { fetchGamerTagsSuccess } from '../store/gamerTagReducer';
import { requestFetchGamesByUser } from '../api/gameRequests';
import { requestFetchGamerTagsByUser } from '../api/gamerTagRequests';

export async function fetchUserGames(dispatch: any) {
  try {
    const response = await requestFetchGamesByUser();
    if ('error' in response) {
      console.error(response.error);
      return false;
    }
    dispatch(fetchGamesSuccess({ games: response.games }));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function fetchUserGamerTags(dispatch: any) {
  try {
    const response = await requestFetchGamerTagsByUser();
    if ('error' in response) {
      console.error(response.error);
      return false;
    }
    dispatch(fetchGamerTagsSuccess({ gamerTags: response.gamerTags }));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
