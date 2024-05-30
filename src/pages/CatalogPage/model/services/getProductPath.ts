import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import { getCategoryById, getProductTypeById } from '@/shared/api';

interface GetProductPathProps {
  productKey: string;
  categoryKey: string;
}

interface ReturnedValue {
  category?: string;
  subCategory?: string;
}

export const getProductPath = createAsyncThunk<
  ReturnedValue,
  GetProductPathProps,
  ThunkConfig<string>
>(
  'catalog/getProductPath',
  async ({ productKey, categoryKey }, { rejectWithValue }) => {
    try {
      const [{ key: category }] = await getProductTypeById(productKey);
      const [{ key: subCategory }] = await getCategoryById(categoryKey);

      return { category, subCategory };
    } catch (e) {
      return rejectWithValue('Wrong Path');
    }
  },
);
