import api from './api';
import type { User, UpdatedUser } from '../../backend/models/userModel';

type requestUpdateUserReturn = { user: User } | { error: string };

export async function requestUpdateUser(updatedUser: UpdatedUser): Promise<requestUpdateUserReturn> {  
  try {
    const response = await api.patch<requestUpdateUserReturn>(`api/users`, { updatedUser });

    if (response.status !== 200) {
      return { error: `Update User Request FAILURE: ${'error' in response.data ? response.data.error : 'unknown error'}` };
    }

    if ('user' in response.data) {
      return { user: response.data.user };
    }
 
    return { error: 'Update User Request FAILURE: unexpected response format' };
  } catch (err) {
    return { error: `Update User Request ERROR: ${err}` };
  }
};