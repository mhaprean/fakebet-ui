import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import igubetApi from './features/igubetApi';
import iguDetaAuthSlice from './features/iguDetaAuthSlice';
import oddspediaApi from './features/oddspediaApi';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import iguDetaApi from './features/iguDetaApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedIguAuth = persistReducer(persistConfig, iguDetaAuthSlice);

export const store = configureStore({
  reducer: {
    [oddspediaApi.reducerPath]: oddspediaApi.reducer,
    [igubetApi.reducerPath]: igubetApi.reducer,
    [iguDetaApi.reducerPath]: iguDetaApi.reducer,
    igudetaauth: persistedIguAuth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([oddspediaApi.middleware, igubetApi.middleware, iguDetaApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
