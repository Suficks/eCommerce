import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import {
  UpdateCartParams,
  addNewProductInCartOrUpdateQuantity,
} from '@/shared/api';

export const removeProduct = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>('cart/removeProduct', async ({ key }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await addNewProductInCartOrUpdateQuantity({
      mode: 'removeProduct',
      key,
      quantity: 1,
    });

    if (!response) {
      throw new Error('Failed to remove product');
    }

    return response;
  } catch (e) {
    return rejectWithValue(e as string);
  }
});
