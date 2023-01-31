import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import igubetApi from './features/igubetApi';

import oddspediaApi from './features/oddspediaApi';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import betslipSlice from './features/betslipSlice';
import authSlice from './features/authSlice';
import { strapi } from './features/strapiApi';
import settingsSlice from './features/settingsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedBetslip = persistReducer(persistConfig, betslipSlice);
const persistedAuth = persistReducer(persistConfig, authSlice);
const persistedSettings = persistReducer(persistConfig, settingsSlice);

export const store = configureStore({
  reducer: {
    [oddspediaApi.reducerPath]: oddspediaApi.reducer,
    [igubetApi.reducerPath]: igubetApi.reducer,
    [strapi.reducerPath]: strapi.reducer,
    settings: persistedSettings,
    auth: persistedAuth,
    betslip: persistedBetslip,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([oddspediaApi.middleware, igubetApi.middleware, strapi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
