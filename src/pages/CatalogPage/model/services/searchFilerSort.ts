import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import {
  getCatalogPageSort,
  getCatalogPageSearch,
} from '../selectors/catalogPageSelectors';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getFilterSortSearchProducts } from '@/shared/api';

export const searchFilterSort = createAsyncThunk<
  ProductProjection[],
  void,
  ThunkConfig<string>
>('catalog/searchFilterSort', async (_, { rejectWithValue, getState }) => {
  const search = getCatalogPageSearch(getState());
  const sort = getCatalogPageSort(getState());

  try {
    const result = await getFilterSortSearchProducts(
      { search, attributesToSort: sort },
      6,
    );

    return result;
  } catch (e) {
    return rejectWithValue('No Products');
  }
});
