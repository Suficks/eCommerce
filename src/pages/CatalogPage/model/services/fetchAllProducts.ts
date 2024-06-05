import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductProjection } from '@commercetools/platform-sdk';
import { ThunkConfig } from '@/app/store/types/StateSchema';
import { AllProductsProps, getAllProducts } from '@/shared/api';

export const fetchAllProducts = createAsyncThunk<
  ProductProjection[],
  AllProductsProps,
  ThunkConfig<string>
>('catalog/fetchAllProducts', async (listSettings, { rejectWithValue }) => {
  try {
    const products = await getAllProducts(listSettings);

    if (!products) {
      throw new Error();
    }

    return products;
  } catch (e) {
    return rejectWithValue('Server Error');
  }
});
