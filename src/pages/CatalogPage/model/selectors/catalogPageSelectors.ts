import { StateSchema } from '@/app/store/types/StateSchema';

export const getCatalogPageIsLoading = (state: StateSchema) =>
  state.catalog?.isLoading ?? '';
export const getCatalogPageProducts = (state: StateSchema) =>
  state.catalog?.products ?? '';
export const getCatalogPageCategories = (state: StateSchema) =>
  state.catalog?.categories ?? '';
export const getCatalogPageBrands = (state: StateSchema) =>
  state.catalog?.brands ?? '';
export const getCatalogPageSearch = (state: StateSchema) =>
  state.catalog?.search ?? '';
export const getCatalogPageSort = (state: StateSchema) =>
  state.catalog?.sort ?? '';
export const getCatalogPageFilters = (state: StateSchema) =>
  state.catalog?.filters ?? '';
