import { memo } from 'react';
import classNames from 'classnames';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { Validation } from '@/shared/const/Validation';

import cls from './RegistrationForm.module.scss';
import { AppError } from '@/shared/ui/AppError/AppError';

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
        <div className={cls.input__wrapper}>
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
            className={errors.email && cls.invalid}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors?.email &&
            AppError({ text: errors.email?.message || 'Error!' })}
        </div>
        <div className={cls.input__wrapper}>
          <Input
            placeholder="password"
            label="Password"
            className={errors.password && cls.invalid}
            type="password"
            register={register('password', {
              required: 'Enter your password!',
              pattern: {
                value: Validation.password,
                message:
                  'English only. Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
              },
            })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors?.password &&
            AppError({ text: errors.password?.message || 'Error!' })}
        </div>
        <div className={cls.input__wrapper}>
          <Input
            placeholder="password_repeat"
            label="Repeat password"
            className={errors.passwordConfirm && cls.invalid}
            type="password"
            register={register('passwordConfirm', {
              required: 'Confirm your password!',
              validate: (value) =>
                value === getValues('password') || 'Must match the password.',
            })}
            aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
          />
          {errors?.passwordConfirm &&
            AppError({ text: errors.passwordConfirm?.message || 'Error!' })}
        </div>
        <Button
          text="Register"
          className={cls.button}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    );
  },
);
