import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { loginByUsername } from '../model/services/loginByUsername';
import { Validation } from '@/shared/const/Validation';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { LoginSubmitData } from '../model/types/LoginSchema';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

const emailOptions = {
  required: 'Enter your email!',
  pattern: {
    value: Validation.email,
    message: 'Invalid email address',
  },
};

const passwordOptions = {
  required: 'Enter your password!',
  pattern: {
    value: Validation.password,
    message:
      'English only. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  },
};

export const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loginForm.isLoading);
  const error = useAppSelector((state) => state.loginForm.error);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginSubmitData>({ mode: 'onChange' });

  const onLoginClick = useCallback(async () => {
    const values = getValues();
    const result = await dispatch(loginByUsername(values));
    if (result.meta.requestStatus === 'fulfilled' && onSuccess) {
      onSuccess();
    }
  }, [dispatch, getValues, onSuccess]);

  if (isLoading) {
    <LoadingAnimation />;
  }

  // if (error) {
  // }

  return (
    <form className={classNames(cls.form, className)}>
      <h1 className={cls.title}>Login</h1>
      <div className={cls.wrapper}>
        <h2 className={cls.subtitle}> Do not have an Account yet?</h2>
        <AppLink to="/registration" text="Sign Up" className={cls.link} />
      </div>
      <Input
        register={register('email', emailOptions)}
        placeholder="email"
        label="Email"
        className={classNames(cls.input, errors.email && cls.invalid)}
      />
      {errors?.email && (
        <AppError
          className={cls.error}
          text={errors.email?.message || 'Error!'}
        />
      )}
      <Input
        register={register('password', passwordOptions)}
        placeholder="password"
        label="Password"
        className={classNames(cls.input, errors.password && cls.invalid)}
        type="password"
      />
      {errors?.password && (
        <AppError
          text={errors.password?.message || 'Error!'}
          className={cls.error}
        />
      )}
      <Button
        text="Login"
        className={cls.button}
        onClick={handleSubmit(onLoginClick)}
      />
    </form>
  );
});
