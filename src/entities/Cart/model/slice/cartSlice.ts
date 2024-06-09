import {
  Cart,
  CentPrecisionMoney,
  DiscountOnTotalPrice,
} from '@commercetools/platform-sdk';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { addToCart } from '../services/addToCart';
import { CartSchema } from '../types/Cart';

const initialState: CartSchema = {
  products: [],
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
        state.getCartLoadingProductsIds?.push(action.meta.arg.cardId);
      })
      .addCase(
        addToCart.fulfilled,
        (state, { payload }: PayloadAction<Cart>) => {
          state.products.push(...payload.lineItems);
          state.totalPrice = payload.totalPrice;
          state.discountOnTotalPrice = payload.discountOnTotalPrice;
          state.isLoading = false;
          state.getCartLoadingProductsIds = [];
        },
      )
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.getCartLoadingProductsIds = [];
      });
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
