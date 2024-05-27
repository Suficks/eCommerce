import { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '@/shared/api/BuildClient';

export async function getCustomer(ID: string): Promise<Customer | undefined> {
  try {
    const result = await apiRoot.customers().withId({ ID }).get().execute();
    return result.body;
  } catch (e) {
    const error = e as Error;
    if (error.message === 'Failed to fetch') {
      throw new Error('Server error. Try again later!', {
        cause: 'ServerError',
      });
    }

    if (error.message.includes('URI not found')) {
      throw new Error('The user doesnt exist!', {
        cause: 'ServerCustomerError',
      });
    }
    return undefined;
  }
}
