import api from './api';
import { GamerTag, PartialGamerTag } from '../../backend/models/gamerTagModel';

type requestFetchGamerTagsByUserReturn = { gamerTags: GamerTag[] } | { error: string };

export async function requestFetchGamerTagsByUser(): Promise<requestFetchGamerTagsByUserReturn> {  
  try {
    const response = await api.get<requestFetchGamerTagsByUserReturn>('api/gamerTags');

    if (response.status !== 200) {
      return { error: `Fetch Gamertags By User Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }

    if ('gamerTags' in response.data) {
      return { gamerTags: response.data.gamerTags };
    }

    return { error: 'Fetch Gamertags By User Request FAILURE: unexpected response format' };
  } catch (err) { 
    return { error: `Fetch Gamertags By User Request ERROR: ${err}`};
  }
};

type requestCreateGamerTagReturn = { gamerTag: GamerTag } | { error: string };

export async function requestCreateGamerTag(newGamerTag: PartialGamerTag): Promise<requestCreateGamerTagReturn> {  
  try {
    console.log({newGamerTag});
    const response = await api.post<requestCreateGamerTagReturn>('api/gamerTags', { newGamerTag });

    if (response.status !== 200) {
      return { error: `Create Gamertag Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }
    
    if ('gamerTag' in response.data) {
      return { gamerTag: response.data.gamerTag };
    }
    
    return { error: 'Create Gamertag Request FAILURE: unexpected response format' };
  } catch (err) { 
    return { error: `Create Gamertag Request ERROR: ${err}`};
  }
};

type requestUpdateGamerTagReturn = { gamerTag: GamerTag } | { error: string };

export async function requestUpdateGamerTag(updatedGamerTag: GamerTag): Promise<requestUpdateGamerTagReturn> {  
  try {
    const response = await api.patch<requestUpdateGamerTagReturn>('api/gamerTags', { updatedGamerTag });

    if (response.status !== 200) {
      return { error: `Update Gamertag Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }
    
    if ('gamerTag' in response.data) {
      return { gamerTag: response.data.gamerTag };
    }
    
    return { error: 'Update Gamertag Request FAILURE: unexpected response format' };
  } catch (err) { 
    return { error: `Update Gamertag Request ERROR: ${err}`};
  }
};

type requestDeleteGamerTagReturn = { deletedGamerTagId: number } | { error: string };

export async function requestDeleteGamerTag(gamerTagId: number): Promise<requestDeleteGamerTagReturn> {  
  try {
    const response = await api.delete<requestDeleteGamerTagReturn>(`api/gamerTags?id=${gamerTagId}`);

    if (response.status !== 200) {
      return { error: `Delete GamerTag Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }

    if ('deletedGamerTagId' in response.data) {
      return { deletedGamerTagId: response.data.deletedGamerTagId };
    }
 
    return { error: 'Delete GamerTag Request FAILURE: unexpected response format' };
  } catch (err) {
    return { error: `Delete GamerTag Request ERROR: ${err}` };
  }
};