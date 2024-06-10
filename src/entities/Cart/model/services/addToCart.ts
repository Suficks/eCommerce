import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cart } from '@commercetools/platform-sdk';
import {
  UpdateCartParams,
  addNewProductInCartOrUpdateQuantity,
} from '@/shared/api';
import { ThunkConfig } from '@/app/store/types/StateSchema';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';

export const addToCart = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>('cart/addToCart', async ({ cardId, quantity = 1 }, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const { id, version } = getLocalStorageValue(LocalStorageKeys.ACTIVE_CART);
  const cartData = id ? { id, version } : null;

  try {
    const response = await addNewProductInCartOrUpdateQuantity({
      mode: 'new',
      quantity,
      cardId,
      cartData,
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue(e as string);
  }
});
