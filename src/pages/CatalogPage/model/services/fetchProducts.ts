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
    brands: new Set<string>(),
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

    products.forEach((item) => {
      data.brands.add(
        item.masterVariant.attributes?.find(
          (attribute) => attribute.name === 'brand',
        )?.value,
      );
    });

    return data;
  } catch (e) {
    return rejectWithValue('Server Error');
  }
});
