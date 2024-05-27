import { Address, Customer } from '@commercetools/platform-sdk';

export const getBillingAddresses = (
  customerData: Customer,
): Address[] | undefined => {
  if (customerData) {
    const { addresses } = customerData;
    return addresses.filter((address) => {
      const addressesId = address.id;
      if (addressesId) {
        return customerData.billingAddressIds?.includes(addressesId);
      }
      return false;
    });
  }
  return undefined;
};
