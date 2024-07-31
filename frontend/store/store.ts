import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';
import gameListReducer from './gameListReducer';

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
    auth: persistReducer(persistConfig, authReducer),
    userData: persistReducer(persistConfig, userReducer),
    gameListData: persistReducer(persistConfig, gameListReducer)
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
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);