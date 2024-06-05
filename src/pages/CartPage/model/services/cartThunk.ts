import { createAsyncThunk } from '@reduxjs/toolkit';

import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { LoginSubmitData } from '../types/Login';
import { loginUser } from '@/shared/api';
import { userActions } from '@/entities/User';
import { ThunkConfig } from '@/app/store/types/StateSchema';

export const cartThunk = createAsyncThunk<
  ByProjectKeyRequestBuilder,
  LoginSubmitData,
  ThunkConfig<string>
>('cart/cartThunk', async ({ email, password }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  try {
    const response = await loginUser(email, password);

    if (!response) {
      throw new Error();
    }

    dispatch(userActions.setIsLogged(true));

    return response;
  } catch (e) {
    return rejectWithValue('error');
  }
});
