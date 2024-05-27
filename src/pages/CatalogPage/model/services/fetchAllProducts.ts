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
    const response = await getAllProducts(listSettings);

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue('No products');
  }
});
