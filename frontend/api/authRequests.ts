import api from './api';

interface User {
  id: number;
  username: string;
  password: string;
  email: string | null;
  favouriteGame: string | null;
  preferredPlatform: string | null;
  numberOfGames: number | null;
}

interface AuthError {
  error: {
    code: 'AUTH_FAILED' | 'SERVER_ERROR' | 'AUTH_ERROR';
    message: string;
  }
}

const frontendError = {
  code: 'FRONTEND_ERROR',
  message: `Authentication service error. Please try again later.`
}

export type requestLoginUserResponse = { token: string; user: User } | AuthError;

export async function requestLoginUser(username: string, password: string): Promise<requestLoginUserResponse> {  
  try {
    const response = await api.post<requestLoginUserResponse>('api/auth/login', { username, password });

    if ('error' in response.data) {
      return { error: response.data.error };
    }

    return { token: response.data.token, user: response.data.user };
  } catch (err) {
    console.error('Login User Request ERROR:', err);

    return { error: frontendError };
  }
};

type requestRegisterUserResponse = { token: string; user: User } | AuthError;

export async function requestRegisterUser(username: string, password: string): Promise<requestRegisterUserResponse> {  
  try {
    const response = await api.post<requestRegisterUserResponse>('api/auth/register', { username, password });

    if ('error' in response.data) {
      return { error: response.data.error };
    }

    return { token: response.data.token, user: response.data.user };
  } catch (err) {
    console.error('Register User Request ERROR:', err);

    return { error: frontendError };
  }
};

export async function validateToken(): Promise<{ valid: boolean } | AuthError> {
  try {
    const response = await api.get('api/auth/validate');
    
    if ('error' in response.data) {
      return { error: response.data.error };
    }

    return { valid: true };
  } catch (err) {
    console.error('Token Validation Request ERROR:', err);

    return { error: frontendError };
  }
}