import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { addNewProductInCartOrUpdateQuantity } from '@/shared/api';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';

export const removeProduct = createAsyncThunk<
  Cart,
  string,
  ThunkConfig<string>
>('cart/removeProduct', async (id, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  const cart = getLocalStorageValue(LocalStorageKeys.ACTIVE_CART);

  try {
    const response = await addNewProductInCartOrUpdateQuantity({
      mode: 'removeProduct',
      cardId: id,
      cartData: cart,
    });

    if (!response) {
      throw new Error('Failed to remove product');
    }

    return response;
  } catch (e) {
    return rejectWithValue(e as string);
  }
});
