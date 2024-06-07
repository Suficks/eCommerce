import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart } from '@commercetools/platform-sdk';

import { addToCart } from '../services/addToCart';
import { CartSchema } from '../types/Cart';

const initialState: CartSchema = {
  products: [],
  isLoading: false,
  getCartLoadingProductsIds: [],
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
