import { memo } from 'react';
import classNames from 'classnames';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { Validation } from '@/shared/const/Validation';

import cls from './RegistrationForm.module.scss';

export interface RegistrationFormProps {
  className?: string;
}

export const RegistrationFormUser = memo(
  ({ className }: RegistrationFormProps) => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      getValues,
    } = useForm<SubmitData>({ mode: 'onChange' });

    type SubmitData = {
      email: string;
      password: string;
      passwordConfirm: string;
    };

    const onSubmit: SubmitHandler<SubmitData> = () => {
      console.log(getValues());
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames(cls.form, className)}
      >
        <Input
          register={register('email', {
            required: 'Enter your email!',
            pattern: {
              value: Validation.email,
              message: 'Invalid email address',
            },
          })}
          type="email"
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
          placeholder="password"
          label="Password"
          className={cls.input}
          type="password"
          register={register('password', {
            required: 'Enter your password!',
            pattern: {
              value: Validation.password,
              message:
                'English only. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
            },
          })}
        />
        <div className={cls.error}>
          {errors?.password && (
            <p className={cls.error__message}>
              {errors.password?.message || 'Error!'}
            </p>
          )}
        </div>
        <Input
          placeholder="password_repeat"
          label="Repeat password"
          className={cls.input}
          type="password"
          register={register('passwordConfirm', {
            required: 'Confirm your password!',
            validate: (value) =>
              value === getValues('password') || 'Must match the password.',
          })}
        />
        <div className={cls.error}>
          {errors?.passwordConfirm && (
            <p className={cls.error__message}>
              {errors.passwordConfirm?.message || 'Error!'}
            </p>
          )}
        </div>
        <Button
          text="Login"
          className={cls.button}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    );
  },
);
