import { StateSchema } from '@/app/store/types/StateSchema';

export const getCatalogPageSearch = (state: StateSchema) =>
  state.catalog?.search ?? '';
export const getCatalogPageIsLoading = (state: StateSchema) =>
  state.catalog?.isLoading ?? '';
export const getCatalogPageProducts = (state: StateSchema) =>
  state.catalog?.products ?? '';
export const getCatalogPageCategories = (state: StateSchema) =>
  state.catalog?.categories ?? '';
