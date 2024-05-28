import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';

import { CatalogPageData, CatalogSchema } from '../types/Catalog';
import { fetchProducts } from '../services/fetchProducts';
import { getProductPath } from '../services/getProductPath';
import { searchFilterSort } from '../services/searchFilerSort';

const initialState: CatalogSchema = {
  isLoading: false,
  products: [],
  discountProducts: [],
  categories: [],
  search: '',
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
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
      })
      .addCase(getProductPath.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductPath.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductPath.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(
        searchFilterSort.fulfilled,
        (state, { payload }: PayloadAction<ProductProjection[]>) => {
          state.products = payload;
        },
      );
  },
});

export const { actions: catalogActions, reducer: catalogReducer } =
  catalogSlice;
