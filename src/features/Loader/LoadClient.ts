import { Customer } from '@commercetools/platform-sdk';
import { getCustomer } from '@/shared/api/requests/getCustomer';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export const loadClient = async (): Promise<Customer | null> => {
  if (localStorage.getItem('user')) {
    const { id } = await JSON.parse(
      localStorage.getItem(LocalStorageKeys.USER) as string,
    );
    const client = await getCustomer(id);
    return client || null;
  }
  return null;
};
