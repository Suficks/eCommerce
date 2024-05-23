import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getCategories } from '@/shared/api/requests/getCategories';
import { CategoryCustom } from '@/shared/api/types/apiTypes';

export const fetchCategories = createAsyncThunk<
  CategoryCustom[],
  void,
  ThunkConfig<string>
>('catalog/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories();

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (e) {
    return rejectWithValue('No categories');
  }
});