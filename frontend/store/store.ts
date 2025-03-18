import { configureStore } from '@reduxjs/toolkit';
import authReducer, { logout } from './authReducer';
import userReducer from './userReducer';
import gameReducer, { reset } from './gameReducer';
import gamerTagReducer from './gamerTagReducer';

import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1
};

export const store = configureStore({
  reducer: {
    authData: persistReducer(persistConfig, authReducer),
    userData: persistReducer(persistConfig, userReducer),
    gameData: persistReducer(persistConfig, gameReducer),
    gamerTagData: persistReducer(persistConfig, gamerTagReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const purgeStoredState = () => {
  persistor.purge();
  store.dispatch(logout());
  store.dispatch(reset());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
