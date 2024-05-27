import classNames from 'classnames';

import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { Validation, ValidationErrors } from '@/shared/const/Validation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { SubmitData } from '@/features/Registration';

import cls from './PersonalDataSection.module.scss';

import { editCustomerEmail } from '@/shared/api/requests/updateCustomerInfo';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { ToastConfig } from '@/shared/const/ToastConfig';

export interface UserData {
  username: string;
  surname: string;
  email: string;
  password: string;
  birthdate: string;
}
export interface PersonalDataProps {
  className?: string;
  user: UserData;
}

export const PersonalDataSection = ({ className, user }: PersonalDataProps) => {
  const { username, surname, email, password, birthdate } = user;
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SubmitData>({
    mode: 'onChange',
    defaultValues: {
      username,
      surname,
      email,
      password,
      birthdate,
    },
  });
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      const { id } = JSON.parse(
        localStorage.getItem(LocalStorageKeys.USER) as string,
      );
      const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
      const ProfileData = {
        ID: id,
        email: getValues('email'),
        firstName: getValues('username'),
        lastName: getValues('surname'),
        dateOfBirth: getValues('birthdate'),
        version,
      };
      const result = await editCustomerEmail(ProfileData);
      if (result) {
        toast.success('Data Updated!', ToastConfig);
      }
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        switch (error.cause) {
          case 409: {
            errorMessage = 'Server Error! Wrong client version.';
            break;
          }
          default: {
            errorMessage = error.message;
            break;
          }
        }
        toast.error(errorMessage, ToastConfig);
      }
    }
  }, [getValues]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(cls.form, className)}
    >
      <fieldset className={`${cls.field__wrapper} ${!isEdit && cls.blocked}`}>
        <legend className={cls.field__heading}>Personal data</legend>
        <div className={cls.input__wrapper}>
          <Input
            placeholder="Valera"
            label="Name"
            className={`${errors.username && cls.invalid}`}
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
            register={register('email', {
              required: ValidationErrors.email.required,
              pattern: {
                value: Validation.email,
                message: ValidationErrors.email.error,
              },
            })}
            type="text"
            placeholder="example@google.com"
            label="Email"
            className={errors.email && cls.invalid}
          />
          {errors?.email &&
            AppError({ text: errors.email?.message || 'Error!' })}
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
      <div className={cls.button__wrapper}>
        {isEdit && (
          <Button
            text="Save"
            className={cls.button}
            onClick={handleSubmit(onSubmit)}
          />
        )}
        <Button
          text="Edit"
          className={cls.button}
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        />
      </div>
    </form>
  );
};
