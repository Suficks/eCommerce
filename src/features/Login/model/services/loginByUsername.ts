import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@/entities/User';
import { LoginSubmitData } from '../types/LoginSchema';

export const loginByUsername = createAsyncThunk<User, LoginSubmitData>(
  'login/loginByUsername',
  async (authData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      return true;
      // dispatch(userActions.setAuthData(response.data));
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
