import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';
import gameReducer from './gameReducer';
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

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedGameReducer = persistReducer(persistConfig, gameReducer);
const persistedGamerTagReducer = persistReducer(persistConfig, gamerTagReducer);

export const store = configureStore({
  reducer: {
    authData: persistedAuthReducer,
    userData: persistedUserReducer,
    gameData: persistedGameReducer,
    gamerTagData: persistedGamerTagReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const purgeStoredState = () => {
  persistor.purge();
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
