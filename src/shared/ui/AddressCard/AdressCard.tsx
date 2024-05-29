import classNames from 'classnames';

import { AiFillEdit } from 'react-icons/ai';

import cls from './AddressCard.module.scss';

interface AddressCardProps {
  className?: string;
  onClick?: () => void;
  country: string;
  city: string;
  street: string;
  postal: string;
  defaultAddress: boolean;
}

export const AddressCard = (props: AddressCardProps) => {
  const { className, country, city, street, postal, defaultAddress, onClick } =
    props;

  return (
    <div
      className={classNames(
        cls.addressCard,
        className,
        defaultAddress && cls.defaultAddress,
      )}
    >
      <p>Country: {country}</p>
      <p>City: {city}</p>
      <p>Street: {street}</p>
      <p>Postal Code: {postal}</p>
      <button
        className={cls.icon}
        aria-label="Edit"
        type="button"
        onClick={onClick}
      >
        <AiFillEdit size={20} />
      </button>
    </div>
  );
};
