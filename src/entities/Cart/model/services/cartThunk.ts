import { createAsyncThunk } from '@reduxjs/toolkit';

import { Cart } from '@commercetools/platform-sdk';
import {
  UpdateCartParams,
  addNewProductInCartOrUpdateQuantity,
} from '@/shared/api';
import { ThunkConfig } from '@/app/store/types/StateSchema';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';

export const cartThunk = createAsyncThunk<
  Cart,
  UpdateCartParams,
  ThunkConfig<string>
>(
  'cart/cartThunk',
  async ({ cardId, mode, quantity = 1 }, { rejectWithValue }) => {
    const cartFromLS = getLocalStorageValue(LocalStorageKeys.ACTIVE_CART);
    const cartData = Object.keys(cartFromLS).length === 0 ? null : cartFromLS;

    try {
      const response = await addNewProductInCartOrUpdateQuantity({
        mode,
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
  },
);
