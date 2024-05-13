import { memo } from 'react';
import classNames from 'classnames';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { Validation, ValidationErrors } from '@/shared/const/Validation';

import cls from './RegistrationForm.module.scss';
import { AppError } from '@/shared/ui/AppError/AppError';
import { Select } from '@/shared/ui/Select/Select';

export interface RegistrationFormProps {
  className?: string;
}

export const RegistrationFormUser = memo(
  // eslint-disable-next-line max-lines-per-function
  ({ className }: RegistrationFormProps) => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      getValues,
    } = useForm<SubmitData>({
      mode: 'onChange',
      defaultValues: {
        shippingCountry: 'Poland',
      },
    });

    type SubmitData = {
      email: string;
      password: string;
      passwordConfirm: string;
      username: string;
      surname: string;
      birthdate: string;
      shippingStreet: string;
      shippingCity: string;
      shippingCountry: 'Belarus' | 'Ukraine' | 'Poland' | '';
      shippingPostal: string;
      shippingIsDefault: boolean;
      shippingAsBilling: boolean;
      billingStreet: string;
      billingCity: string;
      billingCountry: 'Belarus' | 'Ukraine' | 'Poland';
      billingPostal: string;
      billingIsDefault: boolean;
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
              required: ValidationErrors.email.required,
              pattern: {
                value: Validation.email,
                message: ValidationErrors.email.error,
              },
            })}
            type="email"
            placeholder="example@google.com"
            label="Email"
            className={errors.email && cls.invalid}
          />
          {errors?.email &&
            AppError({ text: errors.email?.message || 'Error!' })}
        </div>
        <div className={cls.input__wrapper}>
          <Input
            placeholder="Strongpassword21"
            label="Password"
            className={errors.password && cls.invalid}
            type="password"
            register={register('password', {
              required: ValidationErrors.password.required,
              pattern: {
                value: Validation.password,
                message: ValidationErrors.password.error,
              },
            })}
          />
          {errors?.password &&
            AppError({ text: errors.password?.message || 'Error!' })}
        </div>
        <div className={cls.input__wrapper}>
          <Input
            placeholder="Strongpassword21"
            label="Repeat password"
            className={errors.passwordConfirm && cls.invalid}
            type="password"
            register={register('passwordConfirm', {
              required: ValidationErrors.password.required,
              validate: (value) =>
                Validation.confirmPassword(value, getValues('password')),
            })}
          />
          {errors?.passwordConfirm &&
            AppError({ text: errors.passwordConfirm?.message || 'Error!' })}
        </div>
        <fieldset className={cls.field__wrapper}>
          <legend className={cls.field__heading}>Personal data</legend>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Valera"
              label="Name"
              className={errors.username && cls.invalid}
              type="text"
              register={register('username', {
                required: ValidationErrors.username.required,
                pattern: {
                  value: Validation.username,
                  message: ValidationErrors.username.error,
                },
              })}
            />
            {errors?.username &&
              AppError({ text: errors.username?.message || 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Kostin"
              label="Surname"
              className={errors.surname && cls.invalid}
              type="text"
              register={register('surname', {
                required: ValidationErrors.surname.required,
                pattern: {
                  value: Validation.surname,
                  message: ValidationErrors.surname.error,
                },
              })}
            />
            {errors?.surname &&
              AppError({ text: errors.surname?.message || 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              label="Birthdate"
              className={`${errors.birthdate && cls.invalid} ${cls.input__date}`}
              type="date"
              register={register('birthdate', {
                required: ValidationErrors.birthDate.required,
                validate: (value) => Validation.birthDate(value),
              })}
            />
            {errors?.birthdate &&
              AppError({ text: errors.birthdate?.message || 'Error!' })}
          </div>
        </fieldset>
        <fieldset className={cls.field__wrapper}>
          <legend className={cls.field__heading}>Shipping address</legend>
          <div className={cls.input__wrapper}>
            <Select
              label="Country"
              optionValues={['Poland', 'Russia', 'Belarus']}
              register={register('shippingCountry', {})}
            />
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Moskow"
              label="City"
              className={errors.shippingCity && cls.invalid}
              type="text"
              register={register('shippingCity', {
                required: ValidationErrors.shipping.city.required,
                pattern: {
                  value: Validation.city,
                  message: ValidationErrors.shipping.city.error,
                },
              })}
            />
            {errors?.shippingCity &&
              AppError({ text: errors.shippingCity?.message || 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Y. Kolasa, 24, 18"
              label="Street"
              className={errors.shippingStreet && cls.invalid}
              type="text"
              register={register('shippingStreet', {
                required: ValidationErrors.shipping.street.required,
              })}
            />
            {errors?.shippingStreet &&
              AppError({ text: errors.shippingStreet?.message || 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="247123"
              label="Postal code"
              className={errors.shippingPostal && cls.invalid}
              type="text"
              register={register('shippingPostal', {
                required: ValidationErrors.shipping.postal.required,
                validate: (value) =>
                  Validation.postalCode(value, getValues('shippingCountry')),
              })}
            />
            {errors?.shippingPostal &&
              AppError({ text: errors.shippingPostal?.message || 'Error!' })}
          </div>
        </fieldset>
        <Button
          text="Register"
          className={cls.button}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    );
  },
);
