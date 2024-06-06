import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cart } from '@commercetools/platform-sdk';
import {
  addNewProductInCartOrUpdateQuantity,
  UpdateCartParams,
} from '@/shared/api';
import { ThunkConfig } from '@/app/store/types/StateSchema';

export const addToCart = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>('cart/addToCart', async ({ cardId, quantity = 1 }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await addNewProductInCartOrUpdateQuantity({
      mode: 'new',
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
