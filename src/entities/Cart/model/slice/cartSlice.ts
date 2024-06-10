import {
  Cart,
  CentPrecisionMoney,
  DiscountOnTotalPrice,
} from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartSchema } from '../types/Cart';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { cartThunk } from '../services/cartThunk';

const initialState: CartSchema = {
  products: getLocalStorageValue(LocalStorageKeys.ACTIVE_CART).lineItems || [],
  isLoading: false,
  getCartLoadingProductsIds: [],
  totalPrice: {} as CentPrecisionMoney,
  discountOnTotalPrice: {} as DiscountOnTotalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cartThunk.pending, (state, action) => {
        state.isLoading = true;
        state.getCartLoadingProductsIds?.push(action.meta.arg.cardId || '');
      })
      .addCase(
        cartThunk.fulfilled,
        (state, { payload }: PayloadAction<Cart>) => {
          state.products = payload.lineItems;
          state.totalPrice = payload.totalPrice;
          state.discountOnTotalPrice = payload.discountOnTotalPrice;
          state.isLoading = false;
          state.getCartLoadingProductsIds = [];
        },
      )
      .addCase(cartThunk.rejected, (state) => {
        state.isLoading = false;
        state.getCartLoadingProductsIds = [];
      });
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
