import {
  ReducersMapObject,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { StateSchema } from '../types/StateSchema';
import { loginReducer } from '@/features/Login';
import { userReducer } from '@/entities/User';
import { catalogReducer } from '@/pages/CatalogPage/model/slice/catalogSlice';

const reducers: ReducersMapObject<StateSchema> = {
  loginForm: loginReducer,
  user: userReducer,
  catalog: catalogReducer,
};

const rootReducer = combineReducers(reducers);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
