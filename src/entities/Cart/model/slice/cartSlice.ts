import {
  Cart,
  CentPrecisionMoney,
  DiscountOnTotalPrice,
  LineItem,
} from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { addToCart } from '../services/addToCart';
import { CartSchema } from '../types/Cart';
import { removeProduct } from '../services/removeProduct';
import { getLocalStorageValue } from '@/shared/util/LocalStorageHandler';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { updateQuantity } from '../services/updateQuantity';

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
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
        state.getCartLoadingProductsIds?.push(action.meta.arg.cardId || '');
      })
      .addCase(
        addToCart.fulfilled,
        (state, { payload }: PayloadAction<Cart>) => {
          state.products = payload.lineItems;
          state.totalPrice = payload.totalPrice;
          state.discountOnTotalPrice = payload.discountOnTotalPrice;
          state.isLoading = false;
          state.getCartLoadingProductsIds = [];
        },
      )
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.getCartLoadingProductsIds = [];
      })
      .addCase(
        removeProduct.fulfilled,
        (state, { payload }: PayloadAction<Cart>) => {
          state.products = payload.lineItems;
        },
      )
      .addCase(updateQuantity.pending, (state, action) => {
        state.isLoading = true;
        state.getCartLoadingProductsIds?.push(action.meta.arg.cardId || '');
      })
      .addCase(
        updateQuantity.fulfilled,
        (state, { payload }: PayloadAction<Cart>) => {
          state.products = payload.lineItems;
          state.getCartLoadingProductsIds = [];
          state.isLoading = false;
        },
      );
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
