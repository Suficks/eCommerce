import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import {
  getCatalogPageSort,
  getCatalogPageSearch,
  getCatalogPageMaxPrice,
  getCatalogPageMinPrice,
  getCatalogPageSelectedBrands,
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
  const selectedBrands = getCatalogPageSelectedBrands(getState());
  const maxPrice = Number(getCatalogPageMaxPrice(getState()));
  const minPrice = Number(getCatalogPageMinPrice(getState()));

  try {
    const result = await getFilterSortSearchProducts({
      search,
      attributesToSort: sort,
      selectedFiltersList: Array.from(selectedBrands),
      categoryType: {
        attributesToFilter: {
          name: 'brand',
        },
      },
      maxPrice,
      minPrice,
    });

    return result;
  } catch (e) {
    return rejectWithValue('No Products');
  }
});
