import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { Address, Customer } from '@commercetools/platform-sdk';
import cls from './EditAddressModal.module.scss';
import { Input } from '@/shared/ui/input/input';
import { Validation, ValidationMessages } from '@/shared/const/Validation';
import { AppError } from '@/shared/ui/AppError/AppError';
import { Button } from '@/shared/ui/button/button';
import { Select } from '@/shared/ui/Select/Select';
import { CountryType } from '@/shared/const/Countries';
import { getShippingAddresses } from '@/pages/ProfilePage/model/services/getShippingAddresses';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { ToastTypes, userMessage } from '@/shared/const/ToastConfig';
import { editCustomerAddress } from '@/shared/api/requests/editCustomerAddress';
import { getBillingAddresses } from '@/pages/ProfilePage/model/services/getBillingAddresses';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { addCustomerAddress } from '@/shared/api/requests/addCustomerAddress';

type ApiResponse = {
  body: Customer;
  statusCode: number;
};
interface ChangeModalProps {
  closeModal: () => void;
  updateAddresses: (
    addresses: Address[],
    defaultAddressId: string | null,
  ) => void;
  addressProps: AddressProps;
  addressType: 'Billing' | 'Shipping';
  newAddress: boolean;
}
interface AddressData {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
}
export interface AddressProps extends AddressData {
  addressId: string;
}

export const EditAddressModal = ({
  closeModal,
  updateAddresses,
  addressProps,
  addressType,
  newAddress,
}: ChangeModalProps) => {
  const {
    country: defaultCountry,
    city: defaultCity,
    street: defaultStreet,
    postalCode: defaultPostalCode,
    addressId,
    isDefault: defaultIsDefault,
  } = addressProps;
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    trigger,
  } = useForm<AddressData>({
    mode: 'onChange',
    defaultValues: {
      country: defaultCountry,
      city: defaultCity,
      street: defaultStreet,
      postalCode: defaultPostalCode,
      isDefault: defaultIsDefault,
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const { country, city, street, postalCode, isDefault } = getValues();
      const user = localStorage.getItem(LocalStorageKeys.USER);
      const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
      if (user && version) {
        const { id } = JSON.parse(user);
        const result = newAddress
          ? ((await addCustomerAddress({
              ID: id,
              version,
              isDefault,
              street,
              postalCode,
              city,
              country,
              addressType,
            })) as ApiResponse)
          : ((await editCustomerAddress({
              ID: id,
              version,
              addressId,
              isDefault,
              street,
              postal: postalCode,
              city,
              country,
              addressType,
            })) as ApiResponse);
        if (result) {
          userMessage(ToastTypes.SUCCESS, 'Address updated successfully.');
          const { body: customerData } = result;
          let addresses = [];
          let defaultAddressId = '';
          if (addressType === 'Shipping') {
            addresses = getShippingAddresses(customerData) || [];
            defaultAddressId = customerData.defaultShippingAddressId ?? '';
          } else {
            addresses = getBillingAddresses(customerData) || [];
            defaultAddressId = customerData.defaultBillingAddressId ?? '';
          }
          updateAddresses(addresses, defaultAddressId ?? null);
          closeModal();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        userMessage(ToastTypes.ERROR, error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    closeModal,
    getValues,
    addressId,
    updateAddresses,
    addressType,
    newAddress,
  ]);

  return (
    <div className={cls.modal__wrapper}>
      {isLoading && <LoadingAnimation fullScreen />}
      <fieldset className={cls.field__wrapper}>
        <AiOutlineClose
          size={25}
          className={cls.closeIcon}
          onClick={() => {
            closeModal();
          }}
        />
        <legend className={cls.field__heading}>Edit Address</legend>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(cls.form)}
        >
          <div className={cls.input__wrapper}>
            <Select
              label="Country"
              optionValues={['Poland', 'Russia', 'Belarus']}
              register={register('country', {
                onChange: () => {
                  setValue('postalCode', '', { shouldValidate: true });
                },
              })}
            />
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Moskow"
              label="City"
              className={errors.city && cls.invalid}
              type="text"
              register={register('city', {
                required: ValidationMessages.shipping.city.required,
                pattern: {
                  value: Validation.city,
                  message: ValidationMessages.shipping.city.error,
                },
              })}
            />
            {errors?.city &&
              AppError({ text: errors.city?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder="Y. Kolasa, 24, 18"
              label="Street"
              className={errors.street && cls.invalid}
              type="text"
              register={register('street', {
                required: ValidationMessages.shipping.street.required,
                pattern: {
                  value: Validation.street,
                  message: ValidationMessages.shipping.street.error,
                },
              })}
            />
            {errors?.street &&
              AppError({ text: errors.street?.message ?? 'Error!' })}
          </div>
          <div className={cls.input__wrapper}>
            <Input
              placeholder={`${(getValues('postalCode') === CountryType.Poland && 'XY-ZZZ') || 'XXXYYY'}`}
              label="Postal code"
              className={errors.postalCode && cls.invalid}
              type="text"
              register={register('postalCode', {
                required: ValidationMessages.shipping.postal.required,
                validate: (value) =>
                  Validation.postalCode(value, getValues('country')),
              })}
            />
            {errors?.postalCode &&
              AppError({ text: errors.postalCode?.message ?? 'Error!' })}
          </div>
          {!defaultIsDefault && (
            <div className={`${cls.input__wrapper} ${cls.checkbox__wrapper}`}>
              <Input
                label="Use as default address"
                classNameLabel={`${cls.label__checkbox} ${getValues('isDefault') && cls.label__checkbox_checked}`}
                className={cls.input__checkbox}
                type="checkbox"
                register={register('isDefault', {
                  onChange: async () => {
                    await trigger('isDefault'); // need this to force rerender component on state change
                  },
                })}
              />
            </div>
          )}
        </form>
        <Button
          text="Save"
          className={cls.button}
          onClick={handleSubmit(onSubmit)}
        />
      </fieldset>
    </div>
  );
};
