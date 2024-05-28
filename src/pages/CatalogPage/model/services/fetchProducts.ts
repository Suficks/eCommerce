import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/store/types/StateSchema';
import {
  AllProductsProps,
  getAllProducts,
  getCategories,
  getDiscountProducts,
} from '@/shared/api';
import { CatalogPageData } from '../types/Catalog';

export const fetchProducts = createAsyncThunk<
  CatalogPageData,
  AllProductsProps,
  ThunkConfig<string>
>('catalog/fetchProducts', async (listSettings, { rejectWithValue }) => {
  const data: CatalogPageData = {
    products: [],
    discountProducts: [],
    categories: [],
  };
  try {
    const products = await getAllProducts(listSettings);
    const discountProducts = await getDiscountProducts();
    const categories = await getCategories();

    if (!products || !discountProducts || !categories) {
      throw new Error();
    }

    data.categories = categories;
    data.products = products;
    data.discountProducts = discountProducts;

    return data;
  } catch (e) {
    return rejectWithValue('Server Error');
  }
});
