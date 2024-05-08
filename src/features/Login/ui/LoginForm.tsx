import { memo, useCallback } from 'react';
import classNames from 'classnames';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { loginActions } from '../model/slice/loginSlice';
import { loginByUsername } from '../model/services/loginByUsername';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.loginForm.username);
  const email = useAppSelector((state) => state.loginForm.email);
  const password = useAppSelector((state) => state.loginForm.password);
  const isLoading = useAppSelector((state) => state.loginForm.isLoading);
  const error = useAppSelector((state) => state.loginForm.error);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value));
    },
    [dispatch],
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(
      loginByUsername({ username, email, password }),
    );
    if (result.meta.requestStatus === 'fulfilled' && onSuccess) {
      onSuccess();
    }
  }, [dispatch, username, email, password, onSuccess]);

  return (
    <form className={classNames(cls.form, className)}>
      <h1 className={cls.title}>Login</h1>
      <div className={cls.wrapper}>
        <h2 className={cls.subtitle}> Do not have an Account yet?</h2>
        <AppLink to="/registration" text="Sign Up" className={cls.link} />
      </div>
      <Input
        placeholder="name"
        label="Name"
        className={cls.input}
        onChange={onChangeUsername}
      />
      <Input
        placeholder="email"
        label="Email"
        className={cls.input}
        onChange={onChangeEmail}
      />
      <Input
        placeholder="password"
        label="Password"
        className={cls.input}
        onChange={onChangePassword}
      />
      <Button text="Login" className={cls.button} onClick={onLoginClick} />
    </form>
  );
});
