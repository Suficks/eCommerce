import classNames from 'classnames';

import { AiFillEdit, AiOutlineClose } from 'react-icons/ai';

import React from 'react';
import cls from './AddressCard.module.scss';
import { AddressProps } from '@/pages/ProfilePage/ui/EditAddressModal/EditAddressModal';

interface AddressCardProps {
  addressId: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  defaultAddress: boolean;
  openModal: (address: AddressProps) => void;
  deleteAddress: (id: string) => void;
}

export const AddressCard = (props: AddressCardProps) => {
  const {
    country,
    city,
    street,
    postalCode,
    defaultAddress,
    addressId,
    openModal,
    deleteAddress,
  } = props;
  return (
    <div
      className={classNames(
        cls.addressCard,
        defaultAddress && cls.defaultAddress,
      )}
    >
      <p>Country: {country}</p>
      <p>City: {city}</p>
      <p>Street: {street}</p>
      <p>Postal Code: {postalCode}</p>
      <div className={cls.iconWrapper}>
        <AiOutlineClose
          size={30}
          className={cls.closeIcon}
          onClick={() => {
            deleteAddress(addressId);
          }}
        />
        <AiFillEdit
          size={30}
          className={cls.iconEdit}
          onClick={() => {
            openModal({
              country,
              city,
              street,
              postalCode,
              addressId,
              isDefault: defaultAddress,
            });
          }}
        />
      </div>
    </div>
  );
};
