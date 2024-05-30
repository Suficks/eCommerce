import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';

import { CatalogPageData, CatalogSchema } from '../types/Catalog';
import { fetchProducts } from '../services/fetchProducts';
import { getProductPath } from '../services/getProductPath';
import { searchFilterSort } from '../services/searchFilerSort';
import { SortMapper, SortingConsts } from '@/shared/const/SortingParams';

const initialState: CatalogSchema = {
  isLoading: false,
  products: [],
  discountProducts: [],
  categories: [],
  search: '',
  sort: { field: 'default', order: '' },
  brands: new Set(),
  filters: [],
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrder: (state, { payload }: PayloadAction<SortingConsts>) => {
      state.sort.field = SortMapper[payload].field;
      state.sort.order = SortMapper[payload].order;
    },
    setFilters: (state, { payload }: PayloadAction<string>) => {
      state.filters.push(payload);
    },
    removeSelectedFilter: (state, { payload }: PayloadAction<string>) => {
      state.filters = state.filters.filter((item) => item !== payload);
    },
    removeAllFilters: (state) => {
      state.filters = [];
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
          state.brands = payload.brands;
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
