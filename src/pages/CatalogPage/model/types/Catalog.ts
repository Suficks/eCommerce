import { ProductProjection } from '@commercetools/platform-sdk';
import { CategoryCustom } from '@/shared/api';

export enum ParentCategoryName {
  PERSONAL_CARE_PRODUCTS = 'Personal care products',
  ACCESSORIES = 'Accessories',
  TABLEWARE = 'Tableware',
  HOME = 'Home',
}

export enum ItemsCategoryName {
  GLASSES = 'Glasses',
  BOTTLES = 'Bottles',
  BAGS = 'Bags',
  CASES = 'Cases',
  CANDLES = 'Candles',
  CLEANING = 'Cleaning',
  ORAL_HYGIENE = 'Oral hygiene',
  SHOWER_AND_SHAVE = 'Shower and shave',
}

export interface CatalogPageData {
  products: ProductProjection[];
  discountProducts: ProductProjection[];
  categories: CategoryCustom[];
  brands: Set<string>;
}

export type SortFields = 'price' | 'name.en-GB' | 'default';
export type SortOrder = 'asc' | 'desc' | '';

export interface CatalogSortObject {
  field: SortFields;
  order: SortOrder;
}

export interface CatalogSchema {
  isLoading?: boolean;

  products: ProductProjection[];
  discountProducts: ProductProjection[];
  categories: CategoryCustom[];

  search: string;
  sort: CatalogSortObject;
  filters: string[];
  brands: Set<string>;
}
