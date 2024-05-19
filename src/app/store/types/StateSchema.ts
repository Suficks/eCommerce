import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/Login';

export interface StateSchema {
  loginForm: LoginSchema;
  user: UserSchema;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  state: StateSchema;
}
