import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/Login/model/types/LoginSchema';

export interface StateSchema {
  loginForm: LoginSchema;
  // TODO когда сделаем редьюсер, сделать поле обязательньм
  user?: UserSchema;
}
