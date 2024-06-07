import { StateSchema } from '@/app/store/types/StateSchema';

export const getCartIsLoading = (state: StateSchema) =>
  state.cart?.isLoading ?? '';
export const getCartLoadingProductsIds = (state: StateSchema) =>
  state.cart?.getCartLoadingProductsIds ?? '';
export const getCartProducts = (state: StateSchema) =>
  state.cart?.products ?? '';
