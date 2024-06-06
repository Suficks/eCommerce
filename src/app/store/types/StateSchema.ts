import { UserSchema } from '@/entities/User';
import { CartSchema } from '@/pages/CartPage';
import { CatalogSchema } from '@/pages/CatalogPage';

export interface StateSchema {
  user: UserSchema;
  catalog: CatalogSchema;
  cart: CartSchema;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
