import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../backend/models/userModel';
import { purgeStoredState } from './store';
import { store } from './store';

interface AuthState {
  token: string | null;
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  token: null,
  user: {
    id: -1,
    username: '',
    passwordDigest: '',
    email: null,
    favouriteGame: null,
    preferredPlatform: null,
    numberOfGames: null,
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'authData',
  initialState: initialAuthState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = initialAuthState.user;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;