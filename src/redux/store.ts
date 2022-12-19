import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import igubetApi from './features/igubetApi';
import oddspediaApi from './features/oddspediaApi';

export const store = configureStore({
  reducer: {
    [oddspediaApi.reducerPath]: oddspediaApi.reducer,
    [igubetApi.reducerPath]: igubetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([oddspediaApi.middleware, igubetApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
