import { apiRoot } from '../BuildClient';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';

interface UpdateCustomerInfoProps {
  ID: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  version: number;
}

export async function editCustomerEmail(
  props: UpdateCustomerInfoProps,
): Promise<unknown> {
  try {
    const { ID, email, firstName, lastName, dateOfBirth, version } = props;
    const response = await apiRoot
      .customers()
      .withId({ ID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeEmail',
              email,
            },
            {
              action: 'setFirstName',
              firstName,
            },
            {
              action: 'setLastName',
              lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth,
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
    return undefined;
  }
}
