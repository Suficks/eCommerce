import { Customer } from '@commercetools/platform-sdk';
import { getCustomer } from '@/shared/api/requests/getCustomer';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export const loadClient = async (): Promise<Customer | undefined> => {
  const user = localStorage.getItem(LocalStorageKeys.USER);
  if (user) {
    const { id } = JSON.parse(user);
    const client = await getCustomer(id);
    return client || undefined;
  }
  return undefined;
};