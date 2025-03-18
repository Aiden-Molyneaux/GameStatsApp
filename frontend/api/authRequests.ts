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

export type requestLoginUserResponse = { token: string; user: User } | AuthError;

export async function requestLoginUser(username: string, password: string): Promise<requestLoginUserResponse> {  
  try {
    const response = await api.post<requestLoginUserResponse>('api/auth/login', { username, password });

    if ('error' in response.data) {
      const error = response.data.error;

      return { 
        error: {
          code: error.code,
          message: error.message
        }
      };
    }

    return { token: response.data.token, user: response.data.user };
  } catch (err) {
    console.error('Login User Request ERROR:', err);

    return { 
      error: {
        code: 'SERVER_ERROR',
        message: `Authentication service error`
      }
    };
  }
};

type requestRegisterUserResponse = { token: string; user: User } | AuthError;

export async function requestRegisterUser(username: string, password: string): Promise<requestRegisterUserResponse> {  
  try {
    const response = await api.post<requestRegisterUserResponse>('api/auth/register', { username, password });

    if ('error' in response.data) {
      const error = response.data.error;

      return { 
        error: {
          code: error.code,
          message: error.message
        }
      };
    }

    return { token: response.data.token, user: response.data.user };
  } catch (err) {
    console.error('Register User Request ERROR:', err);

    return { 
      error: {
        code: 'SERVER_ERROR',
        message: `Authentication service error`
      }
    };
  }
};

export async function validateToken(): Promise<{ valid: boolean } | AuthError> {
  try {
    const response = await api.get('api/auth/validate');
    
    if ('error' in response.data) {
      const error = response.data.error;

      return { 
        error: {
          code: error.code,
          message: error.message
        }
      };
    }

    return { valid: true };
  } catch (err) {
    console.error('Token Validation Request ERROR:', err);

    return { 
      error: {
        code: 'SERVER_ERROR',
        message: `Authentication service error`
      }
    };
  }
}