import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import cls from '@/pages/ProfilePage/ui/ChangePasswordModal/ChangePasswordModal.module.scss';
import { Input } from '@/shared/ui/input/input';
import { Validation, ValidationErrors } from '@/shared/const/Validation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { Button } from '@/shared/ui/button/button';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { ToastConfig } from '@/shared/const/ToastConfig';
import { updateCustomerPassword } from '@/shared/api/requests/updatePassword';

interface ChangeModalProps {
  closeModal: () => void;
}
interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

export const ChangePasswordModal = ({ closeModal }: ChangeModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<ChangePasswordData>({
    mode: 'onChange',
    defaultValues: {},
  });
  const [inputOldPassType, setInputOldPassType] = useState<'password' | 'text'>(
    'password',
  );
  const [inputNewPassType, setInputNewPassType] = useState<'password' | 'text'>(
    'password',
  );
  const [inputRepeatPassType, setInputRepeatPassType] = useState<
    'password' | 'text'
  >('password');
  const onSubmit = useCallback(async () => {
    try {
      const { id } = JSON.parse(
        localStorage.getItem(LocalStorageKeys.USER) as string,
      );
      const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
      const ProfileData = {
        ID: id,
        oldPassword: getValues('oldPassword'),
        newPassword: getValues('newPassword'),
        version,
      };
      const result = await updateCustomerPassword(ProfileData);
      if (result) {
        toast.success('Password Updated!', ToastConfig);
        closeModal();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, ToastConfig);
      }
    }
  }, [closeModal, getValues]);

  return (
    <div className={cls.modal__wrapper}>
      <fieldset className={cls.field__wrapper}>
        <AiOutlineClose
          size={25}
          className={cls.closeIcon}
          onClick={() => {
            closeModal();
          }}
        />
        <legend className={cls.field__heading}>Change Password</legend>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(cls.form)}
        >
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Strongpassword21"
              label="Current password"
              className={errors.oldPassword && cls.invalid}
              type={inputOldPassType}
              icon={
                inputOldPassType === 'password' ? (
                  <AiFillEye
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputOldPassType('text')}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputOldPassType('password')}
                  />
                )
              }
              register={register('oldPassword', {
                required: ValidationErrors.password.required,
                pattern: {
                  value: Validation.password,
                  message: ValidationErrors.password.error,
                },
              })}
            />
            {errors?.oldPassword &&
              AppError({ text: errors.oldPassword?.message || 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Strongpassword21"
              label="New password"
              className={errors.newPassword && cls.invalid}
              type={inputNewPassType}
              icon={
                inputNewPassType === 'password' ? (
                  <AiFillEye
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputNewPassType('text')}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={25}
                    className={cls.eye_icon}
                    onClick={() => setInputNewPassType('password')}
                  />
                )
              }
              register={register('newPassword', {
                required: ValidationErrors.password.required,
                pattern: {
                  value: Validation.password,
                  message: ValidationErrors.password.error,
                },
                onChange: () => {
                  setValue('repeatPassword', `${getValues('repeatPassword')}`, {
                    shouldValidate: true,
                  });
                },
              })}
            />
            {errors?.newPassword &&
              AppError({ text: errors.newPassword?.message || 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Strongpassword21"
              label="Confirm password"
              className={errors.repeatPassword && cls.invalid}
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
              register={register('repeatPassword', {
                required: ValidationErrors.password.required,
                validate: (value) =>
                  Validation.confirmPassword(value, getValues('newPassword')),
              })}
            />
            {errors?.repeatPassword &&
              AppError({ text: errors.repeatPassword?.message || 'Error!' })}
          </div>
          <Button
            text="Confirm"
            className={cls.button}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </fieldset>
    </div>
  );
};
