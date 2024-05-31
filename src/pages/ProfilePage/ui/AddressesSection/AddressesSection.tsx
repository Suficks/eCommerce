import React, { useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddressCard } from '@/shared/ui/AddressCard/AdressCard';
import { countriesList } from '@/shared/const/Countries';
import cls from './AddressesSection.module.scss';
import {
  AddressProps,
  EditAddressModal,
} from '@/pages/ProfilePage/ui/EditAddressModal/EditAddressModal';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import {
  ToastConfig,
  ToastMessage,
  ToastTypes,
  userMessage,
} from '@/shared/const/ToastConfig';
import { deleteCustomerAddress } from '@/shared/api/requests/deleteCustomerAddress';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';

interface ShippingProps {
  addressesArr: Address[];
  defaultAddress: string;
  addressType: 'Shipping' | 'Billing';
}
export const AddressesSection = ({
  addressesArr,
  defaultAddress,
  addressType,
}: ShippingProps) => {
  const [addresses, setAddresses] = useState<Address[]>(addressesArr);
  const [defaultId, setDefaultId] = useState(defaultAddress);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewAddress, setIsNewAddress] = useState(false);
  const closeModal = () => {
    setEditMode(false);
    setIsNewAddress(false);
  };
  const [currentAddress, setCurrentAddress] = useState<AddressProps>({
    addressId: '',
    city: '',
    isDefault: false,
    country: '',
    postalCode: '',
    street: '',
  });
  const setDefaultAddress = (address: AddressProps) => {
    setCurrentAddress(address);
  };
  const openModal = (props: AddressProps) => {
    setDefaultAddress(props);
    setEditMode(true);
  };
  const updateAddresses = (
    newAddressesArr: Address[],
    newDefaultAddress: string | null,
  ) => {
    if (newDefaultAddress) {
      setDefaultId(newDefaultAddress);
    }
    setAddresses(newAddressesArr);
  };
  const navigate = useNavigate();
  const deleteAddress = async (addressId: string) => {
    try {
      setIsLoading(true);
      const user = localStorage.getItem(LocalStorageKeys.USER);
      const version = Number(localStorage.getItem(LocalStorageKeys.VERSION));
      if (user && version) {
        const { id } = JSON.parse(user);
        const result = await deleteCustomerAddress(id, addressId, version);
        if (result) {
          toast.success('Address Deleted!', ToastConfig);
          const newAddress = addresses.filter(
            (address) => address.id !== addressId,
          );
          setAddresses(newAddress);
          closeModal();
        }
      } else {
        userMessage(ToastTypes.ERROR, 'Local Storage is empty :(');
        navigate('/main');
      }
    } catch (error) {
      if (error instanceof Error) {
        let errorMessage = '';
        switch (error.cause) {
          case 409: {
            errorMessage = 'Error occurred! Wrong client version.';
            break;
          }
          default: {
            errorMessage = error.message;
            break;
          }
        }
        userMessage(
          ToastTypes.ERROR,
          errorMessage || ToastMessage.UNKNOWN_ERROR,
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cls.addressesWrapper}>
        {isLoading && <LoadingAnimation fullScreen />}
        {addresses.map(({ id, city, country, streetName, postalCode }) => {
          return (
            <AddressCard
              key={id}
              city={city ?? ''}
              country={
                countriesList.find(({ abbr }) => abbr === country)?.name ?? ''
              }
              street={streetName ?? ''}
              postalCode={postalCode ?? ''}
              defaultAddress={defaultId === id}
              addressId={id ?? ''}
              openModal={openModal}
              deleteAddress={deleteAddress}
            />
          );
        })}
        <button
          className={cls.addMore}
          aria-label="Add new address"
          type="button"
          onClick={() => {
            setIsNewAddress(true);
            openModal({
              country: 'Poland',
              city: '',
              street: '',
              postalCode: '',
              isDefault: false,
              addressId: '',
            });
          }}
        >
          <AiOutlinePlus size={100} className={cls.icon} />
        </button>
      </div>
      {editMode && (
        <EditAddressModal
          closeModal={closeModal}
          updateAddresses={updateAddresses}
          addressProps={currentAddress}
          addressType={addressType}
          newAddress={isNewAddress}
        />
      )}
    </>
  );
};
