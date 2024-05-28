import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CatalogPageData, CatalogSchema } from '../types/Catalog';
import { fetchProducts } from '../services/fetchProducts';

const initialState: CatalogSchema = {
  isLoading: false,
  products: [],
  discountProducts: [],
  categories: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, { payload }: PayloadAction<CatalogPageData>) => {
          state.isLoading = false;
          state.products = payload.products;
          state.discountProducts = payload.discountProducts;
          state.categories = payload.categories;
        },
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { actions: catalogActions, reducer: catalogReducer } =
  catalogSlice;
