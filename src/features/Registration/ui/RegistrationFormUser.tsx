import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { Validation, ValidationErrors } from '@/shared/const/Validation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { Select } from '@/shared/ui/Select/Select';
import { SubmitData } from '@/features/Registration';

import cls from './RegistrationForm.module.scss';
import { CountryType } from '@/shared/const/Countries';
import { signUpUserThunk } from '@/features/Registration/model/services/signUpThunk';
import { useAppDispatch } from '@/shared/hooks/redux';
import { loginThunk } from '@/features/Login/model/services/loginThunk';

export interface RegistrationFormProps {
  className?: string;
  onSuccess?: () => void;
}

export const RegistrationFormUser = ({
  className,
  onSuccess,
}: RegistrationFormProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    trigger,
  } = useForm<SubmitData>({
    mode: 'onChange',
    defaultValues: {
      shippingCountry: CountryType.Poland,
      billingCountry: CountryType.Poland,
    },
  });
  const [serverError, setServerError] = useState('');
  const [inputPassType, setInputPassType] = useState<'password' | 'text'>(
    'password',
  );
  const [inputRepeatPassType, setInputRepeatPassType] = useState<
    'password' | 'text'
  >('password');

  const onSubmit = useCallback(async () => {
    const values = getValues();
    try {
      const result = await dispatch(signUpUserThunk(values)).unwrap();
      if (result && onSuccess) {
        await dispatch(
          loginThunk({ email: values.email, password: values.password }),
        );
        onSuccess();
      }
    } catch (error) {
      if (typeof error === 'string') {
        setServerError(error);
      }
    }
  }, [dispatch, getValues, onSuccess]);

  const handleBilling = () => {
    if (getValues('shippingAsBilling')) {
      setValue('billingCountry', getValues('shippingCountry'));
      setValue('billingCity', getValues('shippingCity'));
      setValue('billingStreet', getValues('shippingStreet'));
      setValue('billingPostal', getValues('shippingPostal'));
    }
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
            onChange: () => {
              setServerError('');
            },
          })}
          type="text"
          placeholder="example@google.com"
          label="Email"
          className={errors.email && cls.invalid}
        />
        {errors?.email && AppError({ text: errors.email?.message || 'Error!' })}
      </div>
      <div className={cls.input__wrapper}>
        <Input
          placeholder="Strongpassword21"
          label="Password"
          className={errors.password && cls.invalid}
          type={inputPassType}
          icon={
            inputPassType === 'password' ? (
              <AiFillEye
                size={25}
                className={cls.eye_icon}
                onClick={() => setInputPassType('text')}
              />
            ) : (
              <AiFillEyeInvisible
                size={25}
                className={cls.eye_icon}
                onClick={() => setInputPassType('password')}
              />
            )
          }
          register={register('password', {
            required: ValidationErrors.password.required,
            pattern: {
              value: Validation.password,
              message: ValidationErrors.password.error,
            },
            onChange: () => {
              setValue('passwordConfirm', `${getValues('passwordConfirm')}`, {
                shouldValidate: true,
              });
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
          type={inputRepeatPassType}
          icon={
            inputRepeatPassType === 'password' ? (
              <AiFillEye
                size={25}
                className={cls.eye_icon}
                onClick={() => setInputRepeatPassType('text')}
              />
            ) : (
              <AiFillEyeInvisible
                size={25}
                className={cls.eye_icon}
                onClick={() => setInputRepeatPassType('password')}
              />
            )
          }
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
            register={register('shippingCountry', {
              onChange: () => {
                setValue('shippingPostal', '', { shouldValidate: true });
                handleBilling();
              },
            })}
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
              onChange: async () => {
                handleBilling();
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
              pattern: {
                value: Validation.street,
                message: ValidationErrors.shipping.street.error,
              },
              onChange: async () => {
                handleBilling();
              },
            })}
          />
          {errors?.shippingStreet &&
            AppError({ text: errors.shippingStreet?.message || 'Error!' })}
        </div>
        <div className={cls.input__wrapper}>
          <Input
            placeholder={`${(getValues('shippingCountry') === CountryType.Poland && 'XY-ZZZ') || 'XXXYYY'}`}
            label="Postal code"
            className={errors.shippingPostal && cls.invalid}
            type="text"
            register={register('shippingPostal', {
              required: ValidationErrors.shipping.postal.required,
              validate: (value) =>
                Validation.postalCode(value, getValues('shippingCountry')),
              onChange: async () => {
                handleBilling();
              },
            })}
          />
          {errors?.shippingPostal &&
            AppError({ text: errors.shippingPostal?.message || 'Error!' })}
        </div>
        <div className={`${cls.input__wrapper} ${cls.checkbox__wrapper}`}>
          <Input
            label="Use as default address"
            classNameLabel={`${cls.label__checkbox} ${getValues('shippingIsDefault') && cls.label__checkbox_checked}`}
            className={cls.input__checkbox}
            type="checkbox"
            register={register('shippingIsDefault', {
              onChange: async () => {
                await trigger('shippingIsDefault'); // need this to force rerender component on state change
              },
            })}
          />
          <Input
            label="Use as Billing address"
            classNameLabel={`${cls.label__checkbox} ${getValues('shippingAsBilling') && cls.label__checkbox_checked}`}
            className={cls.input__checkbox}
            type="checkbox"
            register={register('shippingAsBilling', {
              onChange: async () => {
                handleBilling();
                await trigger('shippingAsBilling'); // need this to force rerender component on state change
              },
            })}
          />
        </div>
      </fieldset>
      <fieldset className={`${cls.field__wrapper}`}>
        <legend className={cls.field__heading}>Billing address</legend>
        <div
          className={`${cls.input__wrapper} ${getValues('shippingAsBilling') && cls.blocked}`}
        >
          <Select
            label="Country"
            optionValues={['Poland', 'Russia', 'Belarus']}
            register={register('billingCountry', {
              onChange: () => {
                setValue('billingPostal', '', { shouldValidate: true });
              },
            })}
          />
        </div>
        <div
          className={`${cls.input__wrapper} ${getValues('shippingAsBilling') && cls.blocked}`}
        >
          <Input
            placeholder="Moskow"
            label="City"
            className={errors.billingCity && cls.invalid}
            type="text"
            register={register('billingCity', {
              required: ValidationErrors.shipping.city.required,
              pattern: {
                value: Validation.city,
                message: ValidationErrors.shipping.city.error,
              },
            })}
          />
          {errors?.billingCity &&
            AppError({ text: errors.billingCity?.message || 'Error!' })}
        </div>
        <div
          className={`${cls.input__wrapper} ${getValues('shippingAsBilling') && cls.blocked}`}
        >
          <Input
            placeholder="Y. Kolasa, 24, 18"
            label="Street"
            className={errors.billingStreet && cls.invalid}
            type="text"
            register={register('billingStreet', {
              required: ValidationErrors.shipping.street.required,
              pattern: {
                value: Validation.street,
                message: ValidationErrors.shipping.street.error,
              },
            })}
          />
          {errors?.billingStreet &&
            AppError({ text: errors.billingStreet?.message || 'Error!' })}
        </div>
        <div
          className={`${cls.input__wrapper} ${getValues('shippingAsBilling') && cls.blocked}`}
        >
          <Input
            placeholder={`${(getValues('billingCountry') === CountryType.Poland && 'XY-ZZZ') || 'XXXYYY'}`}
            label="Postal code"
            className={errors.billingPostal && cls.invalid}
            type="text"
            register={register('billingPostal', {
              required: ValidationErrors.shipping.postal.required,
              validate: (value) =>
                Validation.postalCode(value, getValues('billingCountry')),
            })}
          />
          {errors?.billingPostal &&
            AppError({ text: errors.billingPostal?.message || 'Error!' })}
        </div>
        <div className={`${cls.input__wrapper} ${cls.checkbox__wrapper}`}>
          <Input
            label="Use as default address"
            classNameLabel={`${cls.label__checkbox} ${getValues('billingIsDefault') && cls.label__checkbox_checked}`}
            className={cls.input__checkbox}
            type="checkbox"
            register={register('billingIsDefault', {
              onChange: async () => {
                await trigger('billingIsDefault'); // need this to force rerender component on state change
              },
            })}
          />
        </div>
      </fieldset>
      {serverError && <AppError text={serverError} className={cls.error} />}
      <Button
        text="Register"
        className={cls.button}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};
