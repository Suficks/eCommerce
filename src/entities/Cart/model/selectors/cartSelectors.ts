import { StateSchema } from '@/app/store/types/StateSchema';

export const getCartIsLoading = (state: StateSchema) =>
  state.cart?.isLoading ?? '';
export const getCartLoadingProductId = (state: StateSchema) =>
  state.cart?.loadingProductId ?? '';
export const getCartIsAdd = (state: StateSchema) => state.cart?.isAdd ?? '';
export const getCartProducts = (state: StateSchema) =>
  state.cart?.products ?? '';
