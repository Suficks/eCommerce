import { Customer, Address } from '@commercetools/platform-sdk';

export const getShippingAddresses = (
  customerData: Customer,
): Address[] | undefined => {
  if (customerData) {
    const { addresses } = customerData;
    return addresses.filter(({ id }) => {
      return id ? customerData.shippingAddressIds?.includes(id) : false;
    });
  }
  return undefined;
};
