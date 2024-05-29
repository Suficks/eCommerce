import { Address, Customer } from '@commercetools/platform-sdk';

export const getShippingAddresses = (
  customerData: Customer,
): Address[] | undefined => {
  if (customerData) {
    const { addresses } = customerData;
    return addresses.filter((address) => {
      const addressesId = address.id;
      if (addressesId) {
        return customerData.shippingAddressIds?.includes(addressesId);
      }
      return false;
    });
  }
  return undefined;
};
