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

export type requestLoginUserResponse = { token: string; user: User } | { error: string };

export async function requestLoginUser(username: string, password: string): Promise<requestLoginUserResponse> {  
  try {
    const response = await api.post<requestLoginUserResponse>('api/auth/login', { username, password });

    if (response.status !== 200) {
      return { error: `Login User Request FAILURE: ${'error' in response.data ? response.data.error : 'Unknown error'}` };
    }

    if ('user' in response.data && 'token' in response.data) {
      return { token: response.data.token, user: response.data.user };
    }
    
    return { error: 'Login User Request FAILURE: unexpected response format' };
  } catch (err) {
    return { error: `Login User Request ERROR: ${err}` };
  }
};

// export async function logoutUser(): Promise<void> {
//   await Keychain.resetGenericPassword();
// };

type requestRegisterUserResponse = { token: string; user: User } | { error: string };

export async function requestRegisterUser(username: string, password: string): Promise<requestRegisterUserResponse> {  
  try {
    const response = await api.post<requestRegisterUserResponse>('api/auth/register', { username, password });

    if (response.status !== 201) {
      return { error: `Register User Request FAILURE: ${'error' in response.data ? response.data.error : 'Unknown error'}` };
    }

    if ('user' in response.data && 'token' in response.data) {
      return { token: response.data.token, user: response.data.user };
    }

    return { error: 'Register User Request FAILURE: unexpected response format' };
  } catch (err) {
    return { error: `Register User Request ERROR: ${err}` };
  }
};

export async function validateToken(): Promise<{ valid: boolean } | { error: string }> {
  try {
    const response = await api.get('api/auth/validate');
    
    if (response.status === 200) {
      return { valid: true };
    }
    
    return { error: 'Token validation failed' };
  } catch (err) {
    return { error: `Token validation ERROR: ${err}` };
  }
}