import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { loginThunk } from '../model/services/loginThunk';
import { Validation, ValidationErrors } from '@/shared/const/Validation';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { LoginSubmitData } from '../model/types/LoginSchema';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

const emailOptions = {
  required: ValidationErrors.email.required,
  pattern: {
    value: Validation.email,
    message: ValidationErrors.email.error,
  },
};

const passwordOptions = {
  required: ValidationErrors.password.required,
  pattern: {
    value: Validation.password,
    message: ValidationErrors.password.error,
  },
};

export const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loginForm);
  const [error, setError] = useState('');
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<LoginSubmitData>({ mode: 'onChange' });

  const onLoginClick = useCallback(async () => {
    try {
      const values = getValues();
      const result = await dispatch(loginThunk(values)).unwrap();
      if (result && onSuccess) {
        onSuccess();
      }
    } catch (e) {
      setError(e as string);
    }
  }, [dispatch, getValues, onSuccess]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <form className={classNames(cls.form, className)}>
      <h1 className={cls.title}>Login</h1>
      <div className={cls.wrapper}>
        <h2 className={cls.subtitle}> Do not have an Account yet?</h2>
        <AppLink to="/registration" className={cls.link}>
          Sign Up
        </AppLink>
      </div>
      <Input
        register={register('email', {
          ...emailOptions,
          onChange: () => setError(''),
        })}
        placeholder="example@google.com"
        type="text"
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
        register={register('password', {
          ...passwordOptions,
          onChange: () => setError(''),
        })}
        placeholder="Strongpassword21"
        label="Password"
        type={inputType}
        className={classNames(cls.input, errors.password && cls.invalid)}
        icon={
          inputType === 'password' ? (
            <AiFillEye
              size={25}
              className={cls.eye_icon}
              onClick={() => setInputType('text')}
            />
          ) : (
            <AiFillEyeInvisible
              size={25}
              className={cls.eye_icon}
              onClick={() => setInputType('password')}
            />
          )
        }
      />
      {errors?.password && (
        <AppError
          text={errors.password?.message || 'Error!'}
          className={cls.error}
        />
      )}
      {error && <AppError text={error} className={cls.error} />}
      <Button
        text="Login"
        className={cls.button}
        onClick={handleSubmit(onLoginClick)}
      />
    </form>
  );
});
