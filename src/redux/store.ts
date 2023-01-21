import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import igubetApi from './features/igubetApi';
import iguDetaAuthSlice from './features/iguDetaAuthSlice';
import oddspediaApi from './features/oddspediaApi';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import iguDetaApi from './features/iguDetaApi';
import betslipSlice from './features/betslipSlice';
import authSlice from './features/authSlice';
import { strapi } from './features/strapiApi';
import settingsSlice from './features/settingsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedIguAuth = persistReducer(persistConfig, iguDetaAuthSlice);
const persistedBetslip = persistReducer(persistConfig, betslipSlice);
const persistedAuth = persistReducer(persistConfig, authSlice);
const persistedSettings = persistReducer(persistConfig, settingsSlice);

export const store = configureStore({
  reducer: {
    [oddspediaApi.reducerPath]: oddspediaApi.reducer,
    [igubetApi.reducerPath]: igubetApi.reducer,
    [iguDetaApi.reducerPath]: iguDetaApi.reducer,
    [strapi.reducerPath]: strapi.reducer,
    settings: persistedSettings,
    auth: persistedAuth,
    iguDetaAuth: persistedIguAuth,
    betslip: persistedBetslip,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([oddspediaApi.middleware, igubetApi.middleware, iguDetaApi.middleware, strapi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
