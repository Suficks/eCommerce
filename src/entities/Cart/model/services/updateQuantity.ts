import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import {
  UpdateCartParams,
  addNewProductInCartOrUpdateQuantity,
} from '@/shared/api';

export const updateQuantity = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>('cart/updateQuantity', async ({ cardId, quantity }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await addNewProductInCartOrUpdateQuantity({
      mode: 'update',
      quantity,
      cardId,
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue(e as string);
  }
});
