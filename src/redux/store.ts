import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import igubetApi from './features/igubetApi';
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
    }).concat([igubetApi.middleware, strapi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
