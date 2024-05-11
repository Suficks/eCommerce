import { memo, useCallback } from 'react';
import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { loginActions } from '../model/slice/loginSlice';
import { loginByUsername } from '../model/services/loginByUsername';
import { Validation } from '@/shared/const/Validation';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

// eslint-disable-next-line max-lines-per-function
export const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.loginForm.username);
  const email = useAppSelector((state) => state.loginForm.email);
  const password = useAppSelector((state) => state.loginForm.password);
  const isLoading = useAppSelector((state) => state.loginForm.isLoading);
  const error = useAppSelector((state) => state.loginForm.error);

  type SubmitData = {
    username: string;
    email: string;
    password: string;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SubmitData>({ mode: 'onChange' });

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value));
    },
    [dispatch],
  );

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value));
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
        register={register('username', {
          required: 'Enter your Name!',
          pattern: {
            value: Validation.username,
            message:
              'Must contain at least one character and no special characters or numbers',
          },
          minLength: {
            value: 1,
            message: 'Name must be at least one character long!',
          },
          maxLength: {
            value: 15,
            message: 'Your name is too long!',
          },
          onChange: () => {
            onChangeUsername(getValues('username'));
          },
        })}
        placeholder="name"
        label="Name"
        className={cls.input}
      />
      <div className={cls.error}>
        {errors?.username && (
          <p className={cls.error__message}>
            {errors.username?.message || 'Error!'}
          </p>
        )}
      </div>
      <Input
        register={register('email', {
          required: 'Enter your email!',
          pattern: {
            value: Validation.email,
            message: 'Invalid email address',
          },
          onChange: () => {
            onChangeEmail(getValues('email'));
          },
        })}
        placeholder="email"
        label="Email"
        className={cls.input}
      />
      <div className={cls.error}>
        {errors?.email && (
          <p className={cls.error__message}>
            {errors.email?.message || 'Error!'}
          </p>
        )}
      </div>
      <Input
        register={register('password', {
          required: 'Enter your password!',
          pattern: {
            value: Validation.password,
            message:
              'English only. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
          },
          onChange: () => {
            onChangePassword(getValues('password'));
          },
        })}
        placeholder="password"
        label="Password"
        className={cls.input}
        type="password"
      />
      <div className={cls.error}>
        {errors?.password && (
          <p className={cls.error__message}>
            {errors.password?.message || 'Error!'}
          </p>
        )}
      </div>
      <Button
        text="Login"
        className={cls.button}
        onClick={handleSubmit(onLoginClick)}
      />
    </form>
  );
});
