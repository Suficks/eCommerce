import {
  ReducersMapObject,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { StateSchema } from '../types/StateSchema';
import { loginReducer } from '@/features/Login/model/slice/loginSlice';

const reducers: ReducersMapObject<StateSchema> = {
  loginForm: loginReducer,
};

const rootReducer = combineReducers(reducers);

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
