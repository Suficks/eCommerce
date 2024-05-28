import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/Login';
import { CatalogSchema } from '@/pages/CatalogPage';

export interface StateSchema {
  loginForm: LoginSchema;
  user: UserSchema;
  catalog: CatalogSchema;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
