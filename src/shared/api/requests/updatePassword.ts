import { apiRoot } from '../BuildClient';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

interface UpdateCustomerPasswordProps {
  ID: string;
  oldPassword: string;
  newPassword: string;
  version: number;
}

export async function updateCustomerPassword(
  props: UpdateCustomerPasswordProps,
): Promise<unknown> {
  try {
    const { ID, oldPassword, newPassword, version } = props;
    const response = await apiRoot
      .customers()
      .password()
      .post({
        body: {
          id: ID,
          version,
          currentPassword: oldPassword,
          newPassword,
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
      if (e.message) {
        throw new Error(e.message);
      }
    }
  }
  return undefined;
}
