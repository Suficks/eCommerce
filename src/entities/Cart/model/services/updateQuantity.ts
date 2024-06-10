import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import {
  UpdateCartParams,
  addNewProductInCartOrUpdateQuantity,
} from '@/shared/api';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';

export const updateQuantity = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>('cart/updateQuantity', async ({ cardId, quantity }, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const cartData = getLocalStorageValue(LocalStorageKeys.ACTIVE_CART);

  try {
    const response = await addNewProductInCartOrUpdateQuantity({
      mode: 'update',
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
