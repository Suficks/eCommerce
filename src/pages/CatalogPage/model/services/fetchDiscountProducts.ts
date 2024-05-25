import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductProjection } from '@commercetools/platform-sdk';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getDiscountProducts } from '@/shared/api';

export const fetchDiscountProducts = createAsyncThunk<
  ProductProjection[],
  void,
  ThunkConfig<string>
>('catalog/fetchDiscountProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await getDiscountProducts();

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue('No products');
  }
});
