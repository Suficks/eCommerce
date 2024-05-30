import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';
import {
  getCatalogPageSort,
  getCatalogPageSearch,
  getCatalogPageMaxPrice,
  getCatalogPageMinPrice,
  getCatalogPageSelectedBrands,
  getCatalogPageSelectedCategory,
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
  const selectedCategoryId = getCatalogPageSelectedCategory(getState());

  try {
    const result = await getFilterSortSearchProducts({
      search,
      attributesToSort: sort,
      selectedFiltersList: Array.from(selectedBrands),
      categoryType: {
        selectedCategoryId,
        attributesToFilter: {
          name: selectedBrands.length !== 0 ? 'brand' : undefined,
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
