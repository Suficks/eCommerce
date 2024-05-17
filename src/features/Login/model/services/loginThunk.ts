import { createAsyncThunk } from '@reduxjs/toolkit';

import { LoginSubmitData } from '../types/LoginSchema';
import { loginUser } from '@/shared/api';
import { userActions } from '@/entities/User';
import { ValidationErrors } from '@/shared/const/Validation';

export const loginThunk = createAsyncThunk(
  'login/loginThunk',
  async ({ email, password }: LoginSubmitData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    try {
      const response = await loginUser(email, password);

      if (!response) {
        throw new Error();
      }

      dispatch(userActions.setIsLogged(true));

      return response;
    } catch (e) {
      const error = e as Error;
      if (error.message === 'emailError') {
        return rejectWithValue(ValidationErrors.email.notExist);
      }
      if (error.message === 'passwordError') {
        return rejectWithValue(ValidationErrors.password.wrongPassword);
      }
      return rejectWithValue(ValidationErrors.serverError.error);
    }
  },
);
