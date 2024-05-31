import { apiRoot } from '../BuildClient';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

export async function deleteCustomerAddress(
  ID: string,
  addressId: string,
  version: number,
): Promise<unknown> {
  try {
    const response = await apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeAddress',
              addressId: `${addressId}`,
            },
          ],
        },
      })
      .execute();
    localStorage.setItem(
      LocalStorageKeys.VERSION,
      JSON.stringify(response.body.version),
    );
    return response;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'Failed to fetch') {
        throw new Error('Server Error! Try again later.', {
          cause: 'ServerError',
        });
      }
      if (e.message.includes('version')) {
        throw new Error('', {
          cause: 409,
        });
      }
      if (e.message) {
        throw new Error(e.message);
      }
    }
  }
  return undefined;
}
