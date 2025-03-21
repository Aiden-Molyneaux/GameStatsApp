import api from './api';
import type { User, UpdatedUser } from '../../backend/models/userModel';

interface UserError {
  error: {
    code: 'SERVER_ERROR' | 'FRONTEND_ERROR';
    message: string;
  }
}

const frontendError = {
  code: 'FRONTEND_ERROR',
  message: `User service error. Please try again later.`
}

type requestUpdateUserReturn = { user: User } | UserError;

export async function requestUpdateUser(updatedUser: UpdatedUser): Promise<requestUpdateUserReturn> {  
  try {
    const response = await api.patch<requestUpdateUserReturn>(`api/users`, { updatedUser });

    if ('error' in response.data) {
      return { error: response.data.error };
    }

    return { user: response.data.user };
  } catch (err) {
    console.error('Update User Request ERROR:', err);

    return { error: frontendError };
  }
};