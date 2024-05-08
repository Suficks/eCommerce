import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User } from '@/entities/User';

interface LoginProps {
  username: string;
  email: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginProps>(
  'login/loginByUsername',
  async (authData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await axios.post<User>('/login', authData);

      if (!response.data) {
        throw new Error();
      }

      // dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
