import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { issuesSlice } from 'redux/issues/issuesSlice';


const issuesPersistConfig = {
  key: 'issues',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(issuesPersistConfig, issuesSlice.reducer),
    issues: issuesSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);