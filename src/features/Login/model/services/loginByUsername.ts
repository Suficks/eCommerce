import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '@/entities/User';
import { apiRoot } from '@/shared/api';

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
      const response = await apiRoot.get().execute();

      console.log(response.statusCode);
      if (!response) {
        throw new Error();
      }

      // dispatch(userActions.setAuthData(response.data));

      return response;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
