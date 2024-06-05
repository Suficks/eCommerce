import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductProjection } from '@commercetools/platform-sdk';
import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getAllProducts } from '@/shared/api';
import {
  getCatalogPageLimit,
  getCatalogPageNumber,
} from '../selectors/catalogPageSelectors';

export const fetchAllProducts = createAsyncThunk<
  ProductProjection[],
  void,
  ThunkConfig<string>
>('catalog/fetchAllProducts', async (_, { rejectWithValue, getState }) => {
  const limit = getCatalogPageLimit(getState());
  const page = getCatalogPageNumber(getState());

  try {
    const products = await getAllProducts({
      currentOffset: page * limit,
      itemPerPage: limit,
    });

    if (!products) {
      throw new Error();
    }

    return products;
  } catch (e) {
    return rejectWithValue('Server Error');
  }
});
