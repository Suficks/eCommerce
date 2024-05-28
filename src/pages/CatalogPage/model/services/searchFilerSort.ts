import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getFilterSortSearchProducts } from '@/shared/api';
import { getCatalogPageSearch } from '../selectors/catalogPageSelectors';

export const searchFilterSort = createAsyncThunk<
  ProductProjection[],
  void,
  ThunkConfig<string>
>('catalog/searchFilterSort', async (_, { rejectWithValue, getState }) => {
  const search = getCatalogPageSearch(getState());
  try {
    const result = await getFilterSortSearchProducts({ search }, 6);

    return result;
  } catch (e) {
    return rejectWithValue('No Products');
  }
});
